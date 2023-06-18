import { useRef, useState } from "react";
import { useAppSelector } from "@src/libs/hooks";
import { selectChangeTheme } from "@src/store/slice/changeThemeSlice";
import Image from "next/image";
import React from "react";
import {
  PhotoIcon,
  VideoCameraIcon,
  PaperClipIcon,
  MicrophoneIcon,
} from "@heroicons/react/24/solid";
import { Wrapper, Tweet, Textarea, Icon, IconText, InputFile } from "./style";
import { BorderLine } from "@components/UserProfile/style";
import ProfileImage from "public/assets/p4.jpeg";

interface Dark {
  $dark: boolean;
}

function Comment() {
  const imageRef = useRef(null);
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const attachmentRef = useRef(null);
  const isDark = useAppSelector(selectChangeTheme);
  const [tweet, setTweet] = useState("");

  const handleClick = (refObject: React.MutableRefObject<any>): void => {
    // open file input box on click of another element
    refObject.current.click();
  };

  const handleFileChange = (event) => {
    const fileObj = event.target.files && event.target.files[0];
    if (!fileObj) {
      return;
    }

    console.log("filObj is", fileObj);

    // reset file input
    event.target.value = null;

    // files is now empty
    console.log(event.target.files);

    // can still access file object here
    console.log("fileObj", fileObj);
    console.log("file name", fileObj.name);
  };

  return (
    <Wrapper $dark={isDark}>
      <Tweet>
        <div className="relative w-11 h-11">
          <Image
            src={ProfileImage}
            alt="user.img"
            priority
            object-fit="contain"
            fill
            className="rounded-full"
          />
        </div>
        <div
          className={`${
            isDark ? "bg-gray-700" : "bg-gray-100"
          } flex-1 w-full h-36 sm:h-32 rounded-xs sm:rounded-2xl sm:rounded-b-3xl shadow-xl`}
        >
          <Textarea
            $dark={isDark}
            value={tweet}
            placeholder="What's on you mind"
            onChange={(e) => setTweet(e.target.value)}
          />
        </div>
      </Tweet>
      <BorderLine $dark={isDark} />
      <div className="flex space-x-5 space-y-3  items-center flex-wrap justify-around  w-full">
        <Icon>
          <InputFile
            type="file"
            ref={imageRef}
            multiple
            accept="image/*"
            onChange={handleFileChange}
          />
          <PhotoIcon
            className="w-6 h-6 cursor-pointer"
            onClick={() => handleClick(imageRef)}
          />
          <IconText $dark={isDark}>Image</IconText>
        </Icon>
        <Icon>
          <InputFile
            type="file"
            ref={videoRef}
            multiple
            accept="video/*"
            onChange={handleFileChange}
          />
          <VideoCameraIcon
            onClick={() => handleClick(videoRef)}
            className="w-6 h-6 cursor-pointer"
          />
          <IconText $dark={isDark}>Clip</IconText>
        </Icon>
        <Icon>
          <InputFile
            type="file"
            ref={attachmentRef}
            multiple
            accept=".doc, .pdf"
            onChange={handleFileChange}
          />
          <PaperClipIcon
            onClick={() => handleClick(attachmentRef)}
            className="w-6 h-6 cursor-pointer"
          />
          <IconText $dark={isDark}>Attachment</IconText>
        </Icon>
        <Icon>
          <InputFile
            type="file"
            ref={audioRef}
            multiple
            accept="audio/*"
            onChange={handleFileChange}
          />
          <MicrophoneIcon
            onClick={() => handleClick(audioRef)}
            className="w-6 h-6 cursor-pointer"
          />
          <IconText $dark={isDark}>Audio</IconText>
        </Icon>
        <button
          type="button"
          disabled={!tweet}
          onClick={() => console.log("I was clicked")}
          className={`${
            isDark ? "bg-blue-600 text-gray-100" : "bg-blue-400 text-gray-950"
          } ${
            tweet ? "cursor-pointer" : "cursor-none"
          } py-2 px-5 font-semibold rounded-xl`}
        >
          Post
        </button>
      </div>
    </Wrapper>
  );
}

export default Comment;
