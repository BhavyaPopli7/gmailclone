import React, { useState } from "react";
import { MdCropSquare, MdInbox, MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { FaCaretDown, FaUserFriends } from "react-icons/fa";
import { IoMdMore, IoMdRefresh } from "react-icons/io";
import {GoTag} from "react-icons/go"
import Emails from "./Emails";
const mailType = [
    {
        icon: <MdInbox size={"20px"}></MdInbox>,
        text: "Primary"
    },
    {
        icon: <GoTag size={"20px"}></GoTag>,
        text: "Promotions"
    },
    {
        icon: <FaUserFriends size={"20px"}></FaUserFriends>,
        text: "Social"
    },
]

const Inbox = () => {

    const [selected, setSelected] = useState(0);
  return (
    <div className="flex-1 bg-white rounded-xl mx-5">
      <div className="flex items-center justify-between px-4 my-2">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <MdCropSquare size={"20px"}></MdCropSquare>
            <FaCaretDown size={"20px"}></FaCaretDown>
          </div>
          <div className="p-2 rounded-full hover:bg-gray-200 cursor-pointer">
            <IoMdRefresh size={"20px"}></IoMdRefresh>
          </div>
          <div className="p-2 rounded-full hover:bg-gray-200 cursor-pointer">
            <IoMdMore size={"20px"}></IoMdMore>
          </div>
        </div>

        <div className="flex items-center gap-6">
            <span>1 to 50</span>
            <MdKeyboardArrowLeft size={"20px"}></MdKeyboardArrowLeft>
            <MdKeyboardArrowRight size={"20px"}></MdKeyboardArrowRight>
        </div>
      </div>

      <div className="h-90vh overflow-y-auto">
        <div className="flex items-center gap-1">
            {
                mailType.map((item,index)=>{
                    return (
                        <button onClick={()=> setSelected(index)} className={`${selected === index ? "border-b-[3.1px] border-b-blue-600 text-blue-600 " : "border-b-4 border-b-transparent"} flex items-center gap-5 p-4 w-60 hover:bg-gray-100`}>
                            {item.icon}
                            <span>{item.text}</span>
                        </button>
                    )
                })
            }
        </div>
        <Emails></Emails>
      </div>
    </div>
  );
};

export default Inbox;
