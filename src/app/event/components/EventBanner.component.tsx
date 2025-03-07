import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewEventFields,
  updateEditedEvent,
} from "@/store/slices/event.slice";
import { default as NextImage } from "next/image";
import Loader from "@/components/Loader";
import { RootState } from "@/store/store";

interface IEventBannerProps {
  handleNextStep: () => void;
  handlePreviousStep: () => void;
  path: string;
}

const EventBanner: React.FC<IEventBannerProps> = ({
  handleNextStep,
  handlePreviousStep,
  path,
}) => {
  const dispatch = useDispatch();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadedBanner, setUploadedBanner] = useState<string | null>("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(false);

  const eventToEditDetails = useSelector(
    (state: RootState) => state.event.eventToEdit,
  );

  const editedEvent = useSelector(
    (state: RootState) => state.event.editedEvent,
  );

  useEffect(() => {
    if (path === "create") {
      const savedEventBanner = localStorage.getItem("eventBanner");
      if (savedEventBanner) {
        setUploadedBanner(savedEventBanner);
      }
    }

    if (path === "edit" && eventToEditDetails) {
      setUploadedBanner(eventToEditDetails.images[0]);
    }
  }, [path, eventToEditDetails]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      // Check file type
      const validTypes = ["image/jpeg", "image/gif", "image/png"];
      if (!validTypes.includes(file.type)) {
        toast.error(
          "Invalid file type. Please upload JPG, GIF, or PNG files only.",
          {
            position: "top-right",
          },
        );
        return;
      }

      // Check image dimensions
      const img = new Image();
      img.src = URL.createObjectURL(file);
      img.onload = async () => {
        if (img.width < 1170 || img.height < 504) {
          toast.error(
            "Image must be at least 1170 pixels wide by 504 pixels high.",
            {
              position: "top-right",
            },
          );
          return;
        }

        setSelectedFile(file);
        setLoading(true);

        const formData = new FormData();
        formData.append("files", file);

        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_BASE_URL}file`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            },
          );

          if (response.data.body.length > 0) {
            setUploadedBanner(response.data.body[0].secure_url);
            toast.success("Image uploaded successfully", {
              position: "top-right",
            });
          } else {
            toast.error("Error uploading file", { position: "top-right" });
          }
        } catch (error) {
          toast.error(`Error uploading file: ${error}`, {
            position: "top-right",
          });
        } finally {
          setLoading(false); // Set loading to false after upload (success or error)
        }
      };
    }
  };

  const handleSaveAndContinue = () => {
    if (!selectedFile && uploadedBanner === "") {
      toast.error("Please select a file", {
        position: "top-right",
      });
      return;
    }

    if (
      uploadedBanner === null ||
      (uploadedBanner === "" && selectedFile !== null)
    ) {
      toast.error("There was an error while uploading your image", {
        position: "top-right",
      });
      return;
    }

    if (path === "create") {
      localStorage.setItem("eventBanner", uploadedBanner);
      dispatch(addNewEventFields({ images: [uploadedBanner] }));
    }

    if (path === "edit") {
      if (editedEvent.length < 2)
        dispatch(updateEditedEvent({ images: [uploadedBanner] }));
    }

    handleNextStep();
  };

  const handleGoBackandEdit = () => {
    handlePreviousStep();
  };

  return (
    <div className="sm:px-20 sm:w-6/12 mb-36">
      <h1 className="text-[32px] font-normal mb-4">Upload Image</h1>

      {/* Input container */}
      <div
        className="w-full border rounded px-10 py-2 "
        style={{ backgroundColor: "#1b2634", borderColor: "#434b57" }}
      >
        <input
          type="file"
          title={""}
          placeholder={""}
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".jpg,.jpeg,.gif,.png"
          className="hidden"
          id="file-upload"
        />
        <div className="flex items-center gap-2">
          {/* Choose file button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="p-2 bg-[#9EDD45]   rounded text-sm font-normal text-[#000] hover:bg-[#9EDD45]"
          >
            Choose File
          </button>
          {/* Display selected file */}
          <span className="text-sm  text-gray-300">
            {selectedFile ? selectedFile.name : "No file chosen"}
            {loading && (
              <div className="flex items-center ml-3">
                <Loader />
                <span className="ml-2">Uploading...</span>
              </div>
            )}
          </span>
        </div>
      </div>

      {/* Information text */}
      <div className="mt-4 space-y-1">
        <p className="text-sm text-gray-300">
          Feature Image must be at least 1170 pixels wide by 504 pixels high.
        </p>
        <p className="text-sm text-gray-300">
          Valid file formats: JPG, GIF, PNG.
        </p>
      </div>

      {/* Display uploaded banner */}
      <div className="mt-4">
        {uploadedBanner && (
          <>
            <p>Uploaded Banner:</p>
            <NextImage
              src={uploadedBanner}
              alt="Uploaded Banner"
              className="w-full h-auto"
              width={1170}
              height={504}
              layout="responsive"
            />
          </>
        )}
      </div>

      <div className="w-full sm:w-auto mt-20">
        <button
          type="button"
          className="w-full sm:w-60 h-[36px] bg-[#9EDD45] text-black rounded-full whitespace-nowrap px-2"
          onClick={handleGoBackandEdit}
        >
          Go back and Edit
        </button>
        <button
          type="button"
          className="w-full sm:w-60 h-[36px] bg-[#9EDD45] text-black rounded-full whitespace-nowrap px-2"
          onClick={handleSaveAndContinue}
        >
          Save & Continue
        </button>
      </div>
    </div>
  );
};

export default EventBanner;
