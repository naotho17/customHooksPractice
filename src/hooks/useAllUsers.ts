// 全ユーザー一覧を取得するカスタムフック

import axios from "axios";
import { useState } from "react";
import { UserProfile } from "../types/userProfile";
import { User } from "../types/api/user";

export const useAllUsers = () => {
  const [userProfiles, setUserProfiles] = useState<Array<UserProfile>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const getUsers = () => {
    setLoading(true);
    setError(false);

    axios
      .get<Array<User>>("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        const data = res.data.map((user) => ({
          id: user.id,
          name: `${user.name}(${user.username})`,
          email: user.email,
          address: `${user.address.city}${user.address.suite}${user.address.street}`
        }));
        setUserProfiles(data);
      })
      // もしcatchでエラーになったらsetErrorをtrueにする
      .catch(() => {
        setError(true);
      })
      // ES2018から追加されたfanally。errorだろうがなんだろうがすべての処理が終わったあとに実行される
      .finally(() => {
        setLoading(false);
      });
  };

  return { getUsers, userProfiles, loading, error };
};
