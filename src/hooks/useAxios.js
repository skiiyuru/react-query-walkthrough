import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE } from "../constants/api";
import { AUTH_ACTIONS } from "../store/auth-slice";
import { ERROR_ACTIONS } from "../store/error-slice";
import { FILE_ACTIONS } from "../store/file-slice";

const useAxios = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useSelector((state) => state.auth);

  const sendRequest = useCallback(
    async ({ method, api, body, params, noAuth, isDownload }, applyData) => {
      setIsLoading(true);

      dispatch(FILE_ACTIONS.updateLoading(true));
      try {
        const { data, status } = await axios({
          baseURL: BASE,
          method: method ? method : null,
          url: api ? api : null,
          data: body ? body : null,
          headers: noAuth
            ? {
                Accept: "application/json",
              }
            : {
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
              },
          params: params ? params : null,
          timeout: 20000,
          responseType: isDownload ? "arraybuffer" : null,
        });

        console.group(`${method} ${api}`);
        console.log("CONFIG", {
          body,
          params,
          token,
          applyData,
        });
        console.log("RESDATA", data);
        console.groupEnd();

        // switch (typeof data) {
        //   case "object":
        //     applyData?.(data)
        //     break

        //   default:
        //     console.log(
        //       "HOOK: =====> Response data is not an object"
        //     )

        //     dispatch(
        //       ERROR_ACTIONS.update({
        //         status: status,
        //         message: "Bad response from server",
        //       })
        //     )
        //     break
        // }

        applyData?.(data);
      } catch (error) {
        if (error?.response) {
          console.group(`${method} ${api}`);
          console.log("CONFIG", {
            body,
            params,
            token,
            applyData,
          });
          console.log("STATUS ", error.response?.status);
          console.log("RESDATA ", error.response?.data);
          console.groupEnd();
          if (error.response?.status === 401) {
            dispatch(AUTH_ACTIONS.logout());
          } else if (error.response?.status && error.response?.data) {
            dispatch(
              ERROR_ACTIONS.update({
                status: error.response.status,
                message: error.response.data?.message,
              })
            );
          }
        }
      }

      setIsLoading(false);
      dispatch(FILE_ACTIONS.updateLoading(false));
    },
    [dispatch, token]
  );

  return { isLoading, sendRequest };
};

export default useAxios;
