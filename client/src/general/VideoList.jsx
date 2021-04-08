import React from "react";
import VideoItem from "./VideoItem";
import { List } from "antd";

export const VideoList = ({ videos, handleVideoSelect, presentation }) => {
  const renderedVideosGrid = videos.map((video) => {
    return (
      <VideoItem
        key={video._id}
        video={video}
        handleVideoSelect={handleVideoSelect}
      />
    );
  });
  const renderedVideosColumn = (
    <List
      itemLayout="horizontal"
      dataSource={videos}
      renderItem={(video) => (
        <List.Item>
          <List.Item.Meta
            avatar={
                <img
                className="ui image"
                src={video.snippet.thumbnails.medium.url}
                alt={video.snippet.description}
              />
            }
            title={<a href="">{video.snippet.title}</a>}
            description={video.snippet.description}
          />
        </List.Item>
      )}
    />
  );
  if (presentation === "grid")
    return <div className="grid">{renderedVideosGrid}</div>;
  else return <div className="column">{renderedVideosColumn}</div>;
};
export default VideoList;
