import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../styles/GirişYap.css";
import { useFormik } from "formik";
import { advancedSchema } from "../schemas";
import { Link } from "react-router-dom";
import axios from "axios";

const onSubmit = async (values, actions) => {
  console.log(values);
  console.log(actions);
  try {
    await loginUserFromMongoDB(values); // Kullanıcı bilgileriyle MongoDB'den giriş yap
    actions.resetForm(); // Formu sıfırla
    alert("Başarıyla giriş yapıldı.");
  } catch (error) {
    alert("Giriş yapılırken bir hata oluştu.");
  }
};

const loginUserFromMongoDB = async (userData) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/kullanicilar",
      userData
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log("Bir hata oluştu:", error);
    throw error;
  }
};


export default function GirişYap() {

  const { values, errors, isSubmitting, handleSubmit, handleChange } =
    useFormik({
      initialValues: {
        eposta: "",
        sifre: "",
      },
      validationSchema:advancedSchema,
      onSubmit
    });

  return (
    <>
      <Navbar />
      <div>
        <div className="girisYap-container">
          <div className="girisYap">
            <div className="tanım">Giriş Yapın</div>
            <form onSubmit={handleSubmit}>

              <div className="girisYap-giris">
                <input
                  type="email"
                  placeholder="E-Mail Adresinizi Giriniz"
                  value={values.eposta}
                  onChange={handleChange}
                  id="eposta"
                  className={errors.eposta ? "input-error" : ""}
                />
                {errors.eposta && <p className="error">{errors.eposta}</p>}
              </div>

              <div className="girisYap-giris">
                <input
                  type="password"
                  placeholder="Şifrenizi Giriniz"
                  value={values.sifre}
                  onChange={handleChange}
                  id="sifre"
                  className={errors.sifre ? "input-error" : ""}
                />
                {errors.sifre && <p className="error">{errors.sifre}</p>}
              </div>

              <div className="girisYap-giris">
                <label className="beni-unutma" htmlFor="beniUnutma">
                  <input type="checkbox" />Beni Unutma
                </label>
              </div>
              <button disabled={isSubmitting} className="girisYap-btn" type="submit">
                Giriş Yap
              </button>
              <div className="hesabinVarsaDiv">
              <Link style={{ color: 'white' }} to='/uyeOl'>Hesabın yok mu?</Link>
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
