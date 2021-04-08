import React from "react";
import { Card } from 'antd';
const { Meta } = Card;

const VideoItem = ({ video }) => {
return (
    <div className=" video-item item">
      <Card
        hoverable
        style={{ width: 240 }}
        cover={
            <img
            className="ui image"
            src={video.snippet.thumbnails.medium.url}
            alt={video.snippet.description}
          />
        }
      >
        <Meta title={video.snippet.title} description={video.snippet.description} />
      </Card>
    </div>
  );
};
export default VideoItem;
