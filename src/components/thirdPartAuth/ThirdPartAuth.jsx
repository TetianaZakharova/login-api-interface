import React from "react";
import thirdPartAuthData from "../../assets/data/thirdPartAuthData.json";
import "./thirdPartAuth.scss";

export const ThirdPartAuth = () => {
  return (
    <section className="auth-container">
      {thirdPartAuthData.map((item) => {
        return (
          <div className="auth-item" key={item.id}>
            <img
              className="auth-logo"
              src={item.img}
              alt={`${item.name} logo auth`}
            />
            {item.name}
          </div>
        );
      })}
    </section>
  );
};
