"use client";

import React, { useContext, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/auth";
import DashboardLayout from "@/components/Dashboard_Layout/Dashboard_layout";
import { uploadToImageBB } from "@/api/imgbb";
import toast, { Toaster } from "react-hot-toast";

const AddAdvertisement = () => {
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      pictures: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "pictures",
  });

  const [imageUrls, setImageUrls] = useState([]);
  const [uploadingStatus, setUploadingStatus] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [thumbnailUploading, setThumbnailUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleThumbnailUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setThumbnailUploading(true);
      const imageUrl = await uploadToImageBB(file);
      setThumbnailUrl(imageUrl);
    } catch (error) {
      console.error("Error uploading thumbnail:", error);
    } finally {
      setThumbnailUploading(false);
    }
  };

  const handleImageUpload = async (e, index) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setIsUploading(true);
      setUploadingStatus((prev) => {
        const newStatus = [...prev];
        newStatus[index] = true;
        return newStatus;
      });

      const imageUrl = await uploadToImageBB(file);
      setImageUrls((prevUrls) => {
        const newUrls = [...prevUrls];
        newUrls[index] = imageUrl;
        return newUrls;
      });
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setIsUploading(false);
      setUploadingStatus((prev) => {
        const newStatus = [...prev];
        newStatus[index] = false;
        return newStatus;
      });
    }
  };

  const onSubmit = async (data) => {
    if (!user || isUploading || uploadingStatus.some((status) => status))
      return;

    setLoading(true);

    const token = localStorage.getItem("elite_token");
    data.host = user;
    data.pictures = imageUrls
      .map((imageUrl, index) => ({
        image_url: imageUrl,
        description: data.pictures[index]?.description || "",
      }))
      .filter((picture) => picture.image_url);
    data.thumbnail_picture = thumbnailUrl;

    try {
      const response = await fetch(
        "https://elitehaven-backend.onrender.com/advertisements/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify(data),
        }
      );

      if (!response.ok) {
        console.error("Failed to add advertisement:", response.statusText);
        return;
      }
      toast.success("Advertisement added successfully") ;
      setLoading(false);
      // router.push("/advertisements");
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto py-8">
        <h2 className="text-3xl font-semibold mb-4">Add Advertisement</h2>
        {loading && (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            <p className="ml-4">Submitting...</p>
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="title" className="block font-medium text-gray-700">
              Title
            </label>
            <input
              id="title"
              {...register("title", { required: true })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.title && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>

          <div>
            <label
              htmlFor="description"
              className="block font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              id="description"
              {...register("description", { required: true })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.description && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>

          <div>
            <label
              htmlFor="map_location"
              className="block font-medium text-gray-700"
            >
              Map Location URL
            </label>
            <input
              id="map_location"
              {...register("map_location", { required: true })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.map_location && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>

          <div>
            <label
              htmlFor="availability"
              className="block font-medium text-gray-700"
            >
              Availability
            </label>
            <input
              id="availability"
              type="checkbox"
              {...register("availability")}
              className="mt-1 block"
            />
          </div>

          <div>
            <label htmlFor="safety" className="block font-medium text-gray-700">
              Safety
            </label>
            <textarea
              id="safety"
              {...register("safety", { required: true })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.safety && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>

          <div>
            <label
              htmlFor="weather"
              className="block font-medium text-gray-700"
            >
              Weather
            </label>
            <textarea
              id="weather"
              {...register("weather", { required: true })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.weather && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>

          <div>
            <label htmlFor="city" className="block font-medium text-gray-700">
              City
            </label>
            <input
              id="city"
              {...register("city", { required: true })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.city && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>

          <div>
            <label
              htmlFor="country"
              className="block font-medium text-gray-700"
            >
              Country
            </label>
            <input
              id="country"
              {...register("country", { required: true })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.country && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>

          <div>
            <label
              htmlFor="speciality"
              className="block font-medium text-gray-700"
            >
              Speciality
            </label>
            <textarea
              id="speciality"
              {...register("speciality", { required: true })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.speciality && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>

          <div>
            <label
              htmlFor="city_size"
              className="block font-medium text-gray-700"
            >
              City Size
            </label>
            <input
              id="city_size"
              type="number"
              step="0.01"
              {...register("city_size", { required: true })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.city_size && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>

          {/* <div>
            <label
              htmlFor="thumbnail_picture"
              className="block font-medium text-gray-700"
            >
              Thumbnail Picture URL
            </label>
            <input
              id="thumbnail_picture"
              {...register("thumbnail_picture", { required: true })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.thumbnail_picture && (
              <span className="text-red-600">This field is required</span>
            )}
          </div> */}

          <div>
            <label
              htmlFor="thumbnail_picture"
              className="block font-medium text-gray-700"
            >
              Thumbnail Picture
            </label>
            <input
              id="thumbnail_picture"
              type="file"
              accept="image/*"
              onChange={handleThumbnailUpload}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {thumbnailUploading && <p>Uploading thumbnail...</p>}
            {thumbnailUrl && (
              <img
                src={thumbnailUrl}
                alt="Thumbnail"
                className="mt-2 w-32 h-32 object-cover"
              />
            )}
          </div>

          <div>
            <label
              htmlFor="price_per_day"
              className="block font-medium text-gray-700"
            >
              Price Per Day
            </label>
            <input
              id="price_per_day"
              type="number"
              step="0.01"
              {...register("price_per_day", { required: true })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.price_per_day && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>

          <div>
            <label
              htmlFor="price_per_month"
              className="block font-medium text-gray-700"
            >
              Price Per Month
            </label>
            <input
              id="price_per_month"
              type="number"
              step="0.01"
              {...register("price_per_month")}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label
              htmlFor="price_6_months"
              className="block font-medium text-gray-700"
            >
              Price for 6 Months
            </label>
            <input
              id="price_6_months"
              type="number"
              step="0.01"
              {...register("price_6_months")}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label
              htmlFor="price_1_year"
              className="block font-medium text-gray-700"
            >
              Price for 1 Year
            </label>
            <input
              id="price_1_year"
              type="number"
              step="0.01"
              {...register("price_1_year")}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label
              htmlFor="rent_individual"
              className="block font-medium text-gray-700"
            >
              Rent (Individual)
            </label>
            <input
              id="rent_individual"
              type="number"
              step="0.01"
              {...register("rent_individual", { required: true })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.rent_individual && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>

          <div>
            <label
              htmlFor="groceries_individual"
              className="block font-medium text-gray-700"
            >
              Groceries (Individual)
            </label>
            <input
              id="groceries_individual"
              type="number"
              step="0.01"
              {...register("groceries_individual", { required: true })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.groceries_individual && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>

          <div>
            <label
              htmlFor="others_individual"
              className="block font-medium text-gray-700"
            >
              Others (Individual)
            </label>
            <input
              id="others_individual"
              type="number"
              step="0.01"
              {...register("others_individual", { required: true })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.others_individual && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>

          <div>
            <label
              htmlFor="total_individual"
              className="block font-medium text-gray-700"
            >
              Total (Individual)
            </label>
            <input
              id="total_individual"
              type="number"
              step="0.01"
              {...register("total_individual", { required: true })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.total_individual && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>

          <div>
            <label
              htmlFor="rent_family"
              className="block font-medium text-gray-700"
            >
              Rent (Family)
            </label>
            <input
              id="rent_family"
              type="number"
              step="0.01"
              {...register("rent_family", { required: true })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.rent_family && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>

          <div>
            <label
              htmlFor="groceries_family"
              className="block font-medium text-gray-700"
            >
              Groceries (Family)
            </label>
            <input
              id="groceries_family"
              type="number"
              step="0.01"
              {...register("groceries_family", { required: true })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.groceries_family && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>

          <div>
            <label
              htmlFor="others_family"
              className="block font-medium text-gray-700"
            >
              Others (Family)
            </label>
            <input
              id="others_family"
              type="number"
              step="0.01"
              {...register("others_family", { required: true })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.others_family && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>

          <div>
            <label
              htmlFor="total_family"
              className="block font-medium text-gray-700"
            >
              Total (Family)
            </label>
            <input
              id="total_family"
              type="number"
              step="0.01"
              {...register("total_family", { required: true })}
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            />
            {errors.total_family && (
              <span className="text-red-600">This field is required</span>
            )}
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Pictures</h3>
            {fields.map((field, index) => (
              <div key={field.id} className="space-y-2">
                <div>
                  <label
                    htmlFor={`pictures[${index}].image`}
                    className="block font-medium text-gray-700"
                  >
                    Upload Image
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, index)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  />
                  {errors.pictures?.[index]?.image_url && (
                    <span className="text-red-600">This field is required</span>
                  )}
                </div>
                <div>
                  <label
                    htmlFor={`pictures[${index}].description`}
                    className="block font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <input
                    id={`pictures[${index}].description`}
                    {...register(`pictures[${index}].description`)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => remove(index)}
                  className="mt-2 px-4 py-2 bg-red-600 text-white rounded"
                >
                  Remove Picture
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() => append({ image_url: "", description: "" })}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded"
            >
              Add Picture
            </button>
          </div>

          <div>
            <button
              type="submit"
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
            >
              Submit
            </button>
            {/* <button
            type="submit"
            disabled={isSubmitting || isUploading || uploadingStatus.some(status => status) || thumbnailUploading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            {isSubmitting || isUploading || uploadingStatus.some(status => status) || thumbnailUploading
              ? "Submitting..."
              : "Submit"}
          </button> */}
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
};

export default AddAdvertisement;
