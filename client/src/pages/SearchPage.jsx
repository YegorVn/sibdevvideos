import React, { useState, useEffect, useContext } from "react";
import { Input, Button, Modal, Slider } from "antd";
import { Tabs } from "antd";
import youtube from "../youtube";
import { VideoList } from "../general/VideoList";
import { useHttp } from "../hooks/http.hook";
import { Loader } from "../general/Loader";
import { useParams } from "react-router-dom";
import {
  UnorderedListOutlined,
  AppstoreOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { AuthContext } from "../context/AuthContext";
const { Search } = Input;
const { TabPane } = Tabs;

export const SearchPage = () => {
  const auth = useContext(AuthContext);
  const { request, loading } = useHttp();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [videos, setVideos] = useState([]);
  const [reqValue, setReqValue] = useState(12);
  const [quantity, setQuantity] = useState();
  const [reqQuantity, setReqQuantity] = useState(12);
  const [presentation, setPresentation] = useState("column");
  const FavId = useParams().id;
  const [searchFlag, setSearchFlag] = useState(false);
  const [data, setData] = useState({
    name: "",
    sort: "",
    quantity: "",
    value: "",
    videos: [],
  });

  const fetchRequest = async () => {
    try {
      const fetched = await request(`/api/chosen/${FavId}`, "GET", null, {
        Authorization: `Bearer ${auth.token}`,
      });
      setReqValue(fetched.value);
      setReqQuantity(fetched.quantity);
      SearchVideos(fetched.value);
    } catch (e) {
      console.log("Запрос не отобразился");
    }
  };

  const onFinish = async () => {
    try {
      const response = await request(
        `/api/chosen/save`,
        "POST",
        { ...data },
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      console.log(data);
      setIsModalVisible(false);
    } catch (e) {
      console.log("Ошибка!!!");
    }
  };

  const SearchVideos = async (value) => {
    try {
      const response = await youtube.get("/search", {
        params: {
          q: value,
          maxResults: reqQuantity,
        },
      });
      setVideos(response.data.items); 
      setQuantity(response.data.items.length);
      setSearchFlag(true);
    } catch (e) {
      console.log(e.message);
    }
  };

  const tabChange = (key) => {
    if (key == 2) {
      setPresentation("grid");
      console.log(presentation);
    } else {
      setPresentation("column");
      console.log(presentation);
    }
  };

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

  const searchOnChange = (e) => {
    setReqValue(e.target.value);
    setData({ ...data, value: e.target.value });
  };

  useEffect(() => {
    if(FavId)fetchRequest();
  }, [FavId, request, videos]);

  if (loading) return <Loader />;
  else
    return (
      <div className="search">
        <h1>Поиск видео</h1>
        <Search
          style={{ width: "72%" }}
          placeholder="Что хотите посмотреть?"
          allowClear
          enterButton={"Найти"}
          size="large"
          onSearch={SearchVideos}
          value={reqValue}
          onChange={searchOnChange}
          suffix={
            <a onClick={showModal}>
              <HeartOutlined />
            </a>
          }
        />
        <div className="annotation">
         {searchFlag && <Tabs onChange={tabChange} type="line">
            <TabPane
              tab={
                <span>
                  <UnorderedListOutlined />
                </span>
              }
              key="1"
            ></TabPane>
            <TabPane
              tab={
                <span>
                  <AppstoreOutlined />
                </span>
              }
              key="2"
            ></TabPane>
          </Tabs>}
        </div>
        {searchFlag && (
          <div className="annotation">
            Видео по запросу "{reqValue}" {quantity}
          </div>
        )}
        {videos && <VideoList videos={videos} presentation={presentation} />}
        <Modal
          title="Сохранить запрос"
          visible={isModalVisible}
          onOk={onFinish}
          onCancel={handleCancel}
          okText="Сохранить"
          cancelText="Не сохранять"
          height={100}
        >
          <label htmlFor="value">Запрос</label>
          <Input name="value" id="value" value={reqValue} />

          <label htmlFor="name" placeholder="Укажите название">
            Название
          </label>
          <Input onChange={favOnChange} name="name" id="name" />

          <label htmlFor="quantity">Количество:</label>
          <Slider
            name="quantity"
            min={1}
            max={50}
            defaultValue={12}
            onChange={onSliderChange}
          />
        </Modal>
      </div>
    );
};
