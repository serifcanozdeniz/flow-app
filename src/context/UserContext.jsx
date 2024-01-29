import { useState } from "react";
import { createContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";

axios.defaults.baseURL = "http://localhost:3090";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  // oturumu açık olan kullanıcının bilgileri tutulacak
  const [activeUser, setActiveUser] = useState();

  //   yönlendirme methodunu tanımla
  const navigate = useNavigate();

  //! sayfa her yenilendiğinde en son oturumu açan kişinin hesap bilgilerini al
  useEffect(() => {
    // id sini alma
    const id = localStorage.getItem("TOKEN");

    if (id) {
      // id sine göre hesap bilgilerini al
      axios
        .get(`/users/${id}`)
        .then((res) => {
          setActiveUser(res.data);
        })
        .catch((err) => toast.error("Kullanıcı bilgileri alınamadı"));
    } else {
      navigate("/login");
    }
  }, []);

  // hesap oluşturma
  const signup = (user) => {
    axios.post("/users", user).then(() => {
      // 1) oturumu açık olan kullanıcının id sini local e kaydet
      localStorage.setItem("TOKEN", user.id);
      // 2) active kullanıcı state ini güncelle
      setActiveUser(user);
      // 3) anasayfaya yönlendir
      navigate("/");
      // 4) bildirim ver
      toast.success("Hesabınız başarıyla oluşturuldu");
    });
  };

  // hesaba giriş yapma
  const login = (user) => {
    // veritabanından bu kullanıcı adı ve şifreyl eşleşen kullanıcıyı al
    axios
      .get(`/users?name=${user.name}&password=${user.password}`)
      .then((res) => {
        if (res.data.length === 0) {
          // kullanıcı gelmezse isim veya şifre yanlış bildirimi gönder
          toast.error("Kullanıcı bulunamadı");
        } else {
          // kullanıcı gelirse aktif kullanıcı olarak belirle
          setActiveUser(res.data[0]);
          localStorage.setItem("TOKEN", res.data[0].id);
          navigate("/");
          toast.success("Hesaba giriş yapıldı");
        }
      })
      .catch((err) => console.log(err));
  };

  // hesaptan çıkma
  const logout = () => {
    // 1) local storage'ı temizle
    localStorage.removeItem("TOKEN");
    // 2) aktif kullanıcıyı sıfırla
    setActiveUser(null);
    // 3) login'e yönlendir
    navigate("/login");
  };

  // hesabı silme
  const deleteAccount = () => {
    // aktif kullanıcıyı veritabanından sil
    axios.delete(`/users/${activeUser.id}`).then(() => {
      // kullanıcının oturumunu kapat
      logout();

      // bildirim ver
      toast.warning("Hesabınız silindi");
    });
  };

  // hesabı güncelle
  const updatePassword = (newPass) => {
    axios
      .patch(`/users/${activeUser.id}`, { password: newPass })
      .then((res) => {
        // hesaba tekrar giriş yapılmasını zorunlu tutmak için oturumu kapatıyoruz
        logout();
        // bildirim ver
        toast.success("Şifreniz başarıyla güncellendi. Tekrar giriş yapın.");
      });
  };

  return (
    <UserContext.Provider
      value={{
        activeUser,
        signup,
        login,
        logout,
        deleteAccount,
        updatePassword,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
