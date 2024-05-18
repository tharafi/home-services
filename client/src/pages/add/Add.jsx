import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { INITIAL_STATE, serviceReducer } from "@/reducers/serviceReducer.js";
import newRequest from "@/utils/newRequest";
import upload from "@/utils/upload";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";

function Add() {
  const [singleFile, setSingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [state, dispatch] = useReducer(serviceReducer, INITIAL_STATE);

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const handleUpload = async () => {
    setUploading(true);
    try {
      const cover = await upload(singleFile);

      const images = await Promise.all(
        [...files].map(async (file) => {
          const url = await upload(file);
          return url;
        })
      );
      setUploading(false);
      dispatch({ type: "ADD_IMAGES", payload: { cover, images } });
    } catch (err) {
      console.log(err);
    }
  };

  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (service) => {
      return newRequest.post("/services", service);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["myServices"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(state);
    // navigate("/myService")
  };
  console.log(state);

  return (
    <div className="add flex justify-center pb-[80px]">
      <div className="container mx-auto px-auto">
        <h2 className="text-gray-600 text-[24px] font-[300] my-[30px]">
          Add New Service
        </h2>
        <div className="sections flex justify-between gap-[100px]">
          <div className="left flex flex-1 flex-col justify-between gap-3">
            <label className="text-gray-600 text-[18px]">Title</label>
            <Input
              name="title"
              type="text"
              placeholder="e.g I will do something I'm really good at"
              onChange={handleChange}
            />
            <label>Category</label>

            <select className=" py-2 px-3  text-sm bg-background border-input border rounded-md w-full h-10 flex" name="category" id="category" onChange={handleChange}>
              <option value="cleaning">Cleaning</option>
              <option value="repair"> Repair</option>
              <option value="painting">Painting</option>
              <option value="shifting">Shifting</option>
              <option value="plumbing">Plumbing</option>
              <option value="electric">Electric</option>
            </select>

            <label>Description</label>
            <Textarea
              name="desc"
              placeholder="Write a description "
              className=""
              onChange={handleChange}
            />
            <Button className="mt-2 py-2" onClick={handleSubmit}>
              Create
            </Button>
          </div>
          <div className="  right flex flex-1 flex-col justify-between gap-[12px]">
            <div className="images flex items-center gap-5 ">
              <div className="imagesInputs flex flex-col gap-5">
                <label className="text-gray-600 text-[18px]">Cover Image</label>
                <Input
                  type="file"
                  onChange={(e) => setSingleFile(e.target.files[0])}
                />
                <label className="text-gray-600 text-[18px]">
                  Upload Images
                </label>
                <Input
                  type="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                />
              </div>
              <Button className="ml-[35px]" onClick={handleUpload}>
                {uploading ? "uploading" : "Upload"}
              </Button>
            </div>
            <label className="text-gray-600 text-[18px]">Price</label>
            <Input type="number" min="1" onChange={handleChange} name="price" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Add;
