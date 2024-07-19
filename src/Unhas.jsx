import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { Navigate, redirect, useNavigate } from "react-router";

function Unhas() {
  const [images, setImages] = useState(null);
  const navigate = useNavigate();

  function FormattedDate({ dateString }) {
    const date = new Date(dateString);
    const formattedDate = format(date, "MMM d, yyyy");

    return <p>{formattedDate}</p>;
  }

  async function deleteNails(id) {
    const response = await fetch(`http://localhost:3000/unhas/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      const newImages = images.filter((item) => item.id == id);
      setImages(newImages);
      fetchData();
    }
  }

  async function fetchData() {
    try {
      const response = await fetch("http://localhost:3000/unhas/", {
        method: "GET",
      });
      const data = await response.json();
      if (data.data) {
        setImages(data.data);
      } else {
        setImages([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-full flex flex-row flex-wrap justify-center gap-8 p-10">
      {images ? (
        images.map((img) => (
          <div
            key={img.id}
            className="bg-slate-100 p-6 rounded-xl flex flex-col gap-2 relative group"
          >
            <button
              onClick={() => deleteNails(img.id)}
              className="absolute right-0 top-0 p-6 hover:bg-slate-200 rounded-xl transition"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9.75 14.25 12m0 0 2.25 2.25M14.25 12l2.25-2.25M14.25 12 12 14.25m-2.58 4.92-6.374-6.375a1.125 1.125 0 0 1 0-1.59L9.42 4.83c.21-.211.497-.33.795-.33H19.5a2.25 2.25 0 0 1 2.25 2.25v10.5a2.25 2.25 0 0 1-2.25 2.25h-9.284c-.298 0-.585-.119-.795-.33Z"
                />
              </svg>
            </button>
            <div className="w-full flex items-center flex-row">
              <h1 className="text-2xl pr-3 ">{img.name}</h1>
              <div
                className="w-6 h-6 rounded-full"
                style={{ backgroundColor: img.color }}
              ></div>
            </div>
            <div className="opacity-30 -mt-2">
              <FormattedDate dateString={img.created_at} />{" "}
            </div>
            <p>{img.description}</p>

            <div className="group w-64 h-64 overflow-hidden relative rounded-xl">
              <img
                src={`https://quqoefsythaqmhtwjxym.supabase.co/storage/v1/object/public/unha/fotosUnhas/${img.image}`}
                alt="Unha"
                className="w-full h-full object-cover transition-transform duration-300 transform group-hover:scale-110"
              />
            </div>
          </div>
        ))
      ) : (
        <h1>Carregando unhas..</h1>
      )}
      {images?.length == 0 && (
        <div className="w-1/5 p-5 rounded-xl bg-slate-100 flex items-center justify-center flex-col">
          <p>Adicione uma unha</p>
          <div
            onClick={() => navigate("/nova")}
            className="pt-15 pb-15 flex items-center justify-center cursor-pointer hover:scale-105 transition"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="64" // Adjust width as needed
              height="64" // Adjust height as needed
              fill="none"
              stroke="grey"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-6"
            >
              <path d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
}

export default Unhas;
