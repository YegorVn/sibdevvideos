import React, { useState, useEffect, useCallback, useContext } from "react";
import { Input, List, Typography, Button, Modal, Slider } from "antd";
import { Loader } from "../general/Loader";
import { useHttp } from "../hooks/http.hook";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const FavouritesPage = () => {
  const { token } = useContext(AuthContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [id, setId] = useState();
  const { loading, request } = useHttp();
  const [data, setData] = useState({
    name: "",
    sort: "",
    quantity: "",
    value: "",
  });
  const [favs, setFavs] = useState([]);

  const fetchFavs = useCallback(async () => {
    try {
      const fetched = await request("/api/chosen", "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      setFavs(fetched);
    } catch (e) {}
  }, [request, token]);

  const changeFav = async () => {
    try {
      const fetch = await request(`/api/chosen/edit/${id}`, "POST", data, {
        Authorization: `Bearer ${token}`,
      });
      setIsModalVisible(false);
    } catch (e) {}
  };

  const fetchUno = async (FavId) => {
    try {
      const fetched = await request(`/api/chosen/${FavId}`, "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      setData(fetched);
    } catch (e) {}
  };

  useEffect(() => {
    fetchFavs();
    // console.log(favs)
  }, [fetchFavs]);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const favOnChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const onSliderChange = (value) => {
    setData({ ...data, quantity: value });
  };

  //полоска при подгрузке, сахар
  if (loading) {
    return <Loader />;
  } else {
    return (
      <div className="favourites">
        <h1>Избранное</h1>
        {favs && !loading && (
          <List
            bordered
            dataSource={favs}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Button
                    onClick={() => {
                      showModal();
                      fetchUno(item._id || "1");
                      setId(item._id);
                    }}
                  >
                    Редактировать
                  </Button>,
                  <Button>
                    <NavLink to={`/currentSearch/${item._id}`}>
                      Выполнить
                    </NavLink>
                  </Button>,
                ]}
              >
                <Typography.Text mark></Typography.Text> {item.name}{" "}
              </List.Item>
            )}
          />
        )}
        {data && id && (
          <Modal
            title="Сохранить запрос"
            visible={isModalVisible}
            onCancel={handleCancel}
            onOk={changeFav}
            okText="Сохранить"
            cancelText="Не сохранять"
            height={100}
          >
            <label htmlFor="value">Запроc</label>
            <Input
              onChange={favOnChange}
              name="value"
              id="value"
              value={data.value}
            />

            <label htmlFor="name" placeholder="Укажите название">
              Название
            </label>
            <Input
              onChange={favOnChange}
              name="name"
              id="name"
              value={data.name}
            />

            <label htmlFor="quantity">Количество:</label>
            <Slider
              name="quantity"
              min={1}
              max={50}
              defaultValue={12}
              onChange={onSliderChange}
            />
          </Modal>
        )}
      </div>
    );
  }
};
