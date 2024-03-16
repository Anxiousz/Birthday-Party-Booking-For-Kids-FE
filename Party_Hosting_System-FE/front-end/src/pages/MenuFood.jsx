import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  Button,
  Input
} from "reactstrap";
import { useLocation, useNavigate } from "react-router-dom";


const MenuFood = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [foodData, setFoodData] = useState([]);
    const authToken = sessionStorage.getItem("authToken");
    const userId = sessionStorage.getItem("userId");
    const role = sessionStorage.getItem("role");
    

 const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
}
    const foodUrl = `https://partyhostingsystems.azurewebsites.net/api/v1/MenuPartyHost/`;
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    foodUrl, config
                    
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch food details");
                }
                const data = await response.json();
                setFoodData(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [authToken, userId]);


}

export default MenuFood;
