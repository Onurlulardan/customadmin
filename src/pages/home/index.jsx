import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/admin/dashboard");
  }, [navigate]);

  return <div>Home Page Hikmet</div>;
};

export default Home;
