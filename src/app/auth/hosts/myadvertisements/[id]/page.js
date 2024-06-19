"use client";
import React, { useState, useEffect, useContext } from "react";
import { useSearchParams } from "next/navigation";
import { uploadToImageBB } from "@/api/imgbb";
import toast from "react-hot-toast";
import DashboardLayout from "@/components/Dashboard_Layout/Dashboard_layout";
import { AuthContext } from "@/context/auth";

function EditAdvertise() {
  const searchParams = useSearchParams();
  const [data, setData] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [formChanged, setFormChanged] = useState(false);
  const token = typeof window !== 'undefined' ? localStorage.getItem("elite_token") : null;
  const [loading, setLoading] = useState(false);

  const {change,setChange} = useContext(AuthContext)

  useEffect(() => {
    const destination = searchParams.get("destination");
    if (destination) {
      setData(JSON.parse(destination));
    }
  }, [searchParams]);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "thumbnailPicture" && files && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(files[0]);
    }
    setData((prevData) => ({
      ...prevData,
      [name]:
        name === "thumbnailPicture"
          ? files[0] || prevData.thumbnailPicture
          : value,
    }));
    setFormChanged(true);
  };

  const handlePicturesChange = (index, e) => {
    const { name, value } = e.target;
    const updatedPictures = [...data.pictures];
    updatedPictures[index][name] = value;
    setData((prevData) => ({
      ...prevData,
      pictures: updatedPictures,
    }));
    setFormChanged(true);
  };

  const handlePreviewImage = (index) => {
    const imageUrl = data.pictures[index].image_url;
    if (imageUrl) {
      setPreviewImage(imageUrl);
    }
  };
  console.log(token);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updatedData = { ...data };

      if (data.thumbnailPicture instanceof File) {
        const thumbnailUrl = await uploadToImageBB(data.thumbnailPicture);
        updatedData.thumbnail_picture = thumbnailUrl;
      }

      const updatedPictures = await Promise.all(
        updatedData.pictures.map(async (picture) => {
          if (picture.image_url instanceof File) {
            const imageUrl = await uploadToImageBB(picture.image_url);
            picture.image_url = imageUrl;
          }
          return picture;
        })
      );
      updatedData.pictures = updatedPictures;

      const response = await fetch(
        `https://elitehaven-backend.onrender.com/advertisements/${data.id}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`,
          },
          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update advertisement.");
      }
      setFormChanged(false);
      toast.success("Successfuly Changed Your Data");
      setChange(!change)
      setLoading(false);
    } catch (error) {
      console.error("Error updating advertisement:", error);
    }
  };
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Edit Advertisement</h1>
        {loading && (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
            <p className="ml-4">Submitting...</p>
          </div>
        )}
        {data ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label
                htmlFor="title"
                className="text-sm font-medium text-gray-600"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                defaultValue={data.title}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded-md mt-1"
                required
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="description"
                className="text-sm font-medium text-gray-600"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                defaultValue={data.description}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded-md mt-1"
                required
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="mapLocation"
                className="text-sm font-medium text-gray-600"
              >
                Map location
              </label>
              <input
                type="text"
                id="mapLocation"
                name="mapLocation"
                defaultValue={data.map_location}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded-md mt-1"
                required
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="availability"
                className="text-sm font-medium text-gray-600"
              >
                Availability
              </label>
              <input
                type="text"
                id="availability"
                name="availability"
                defaultValue={data.availability}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded-md mt-1"
                required
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="safety"
                className="text-sm font-medium text-gray-600"
              >
                Safety
              </label>
              <textarea
                id="safety"
                name="safety"
                defaultValue={data.safety}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded-md mt-1"
                required
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="weather"
                className="text-sm font-medium text-gray-600"
              >
                Weather
              </label>
              <textarea
                id="weather"
                name="weather"
                defaultValue={data.weather}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded-md mt-1"
                required
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="city"
                className="text-sm font-medium text-gray-600"
              >
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                defaultValue={data.city}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded-md mt-1"
                required
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="country"
                className="text-sm font-medium text-gray-600"
              >
                Country
              </label>
              <input
                type="text"
                id="country"
                name="country"
                defaultValue={data.country}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded-md mt-1"
                required
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="speciality"
                className="text-sm font-medium text-gray-600"
              >
                Speciality
              </label>
              <textarea
                id="speciality"
                name="speciality"
                defaultValue={data.speciality}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded-md mt-1"
                required
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="citySize"
                className="text-sm font-medium text-gray-600"
              >
                City size
              </label>
              <input
                type="number"
                id="citySize"
                name="citySize"
                defaultValue={data.city_size}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded-md mt-1"
                required
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="thumbnailPicture"
                className="text-sm font-medium text-gray-600"
              >
                Thumbnail picture
              </label>
              <input
                type="file"
                id="thumbnailPicture"
                name="thumbnailPicture"
                accept="image/*"
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded-md mt-1"
              />
              {previewImage && (
                <img
                  src={previewImage}
                  alt="Thumbnail Preview"
                  className="mt-2 rounded-lg"
                  style={{ maxWidth: "200px" }}
                />
              )}
              {!previewImage && data.thumbnail_picture && (
                <img
                  src={
                    typeof data.thumbnail_picture === "string"
                      ? data.thumbnail_picture
                      : URL.createObjectURL(data.thumbnailPicture)
                  }
                  alt="Thumbnail Preview"
                  className="mt-2 rounded-lg"
                  style={{ maxWidth: "200px" }}
                />
              )}
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="pricePerDay"
                className="text-sm font-medium text-gray-600"
              >
                Price per day
              </label>
              <input
                type="number"
                id="pricePerDay"
                name="pricePerDay"
                defaultValue={data.price_per_day}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded-md mt-1"
                required
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="pricePerMonth"
                className="text-sm font-medium text-gray-600"
              >
                Price per month
              </label>
              <input
                type="number"
                id="pricePerMonth"
                name="pricePerMonth"
                defaultValue={data.price_per_month}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded-md mt-1"
                required
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="price6Months"
                className="text-sm font-medium text-gray-600"
              >
                Price 6 months
              </label>
              <input
                type="number"
                id="price6Months"
                name="price6Months"
                defaultValue={data.price_6_months}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded-md mt-1"
                required
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="price1Year"
                className="text-sm font-medium text-gray-600"
              >
                Price 1 year
              </label>
              <input
                type="number"
                id="price1Year"
                name="price1Year"
                defaultValue={data.price_1_year}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded-md mt-1"
                required
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="rentIndividual"
                className="text-sm font-medium text-gray-600"
              >
                Rent individual
              </label>
              <input
                type="number"
                id="rentIndividual"
                name="rentIndividual"
                defaultValue={data.rent_individual}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded-md mt-1"
                required
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="groceriesIndividual"
                className="text-sm font-medium text-gray-600"
              >
                Groceries individual
              </label>
              <input
                type="number"
                id="groceriesIndividual"
                name="groceriesIndividual"
                defaultValue={data.groceries_individual}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded-md mt-1"
                required
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="othersIndividual"
                className="text-sm font-medium text-gray-600"
              >
                Others individual
              </label>
              <input
                type="number"
                id="othersIndividual"
                name="othersIndividual"
                defaultValue={data.others_individual}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded-md mt-1"
                required
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="totalIndividual"
                className="text-sm font-medium text-gray-600"
              >
                Total individual
              </label>
              <input
                type="number"
                id="totalIndividual"
                name="totalIndividual"
                defaultValue={data.total_individual}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded-md mt-1"
                required
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="rentFamily"
                className="text-sm font-medium text-gray-600"
              >
                Rent family
              </label>
              <input
                type="number"
                id="rentFamily"
                name="rentFamily"
                defaultValue={data.rent_family}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded-md mt-1"
                required
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="groceriesFamily"
                className="text-sm font-medium text-gray-600"
              >
                Groceries family
              </label>
              <input
                type="number"
                id="groceriesFamily"
                name="groceriesFamily"
                defaultValue={data.groceries_family}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded-md mt-1"
                required
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="othersFamily"
                className="text-sm font-medium text-gray-600"
              >
                Others family
              </label>
              <input
                type="number"
                id="othersFamily"
                name="othersFamily"
                defaultValue={data.others_family}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded-md mt-1"
                required
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="totalFamily"
                className="text-sm font-medium text-gray-600"
              >
                Total family
              </label>
              <input
                type="number"
                id="totalFamily"
                name="totalFamily"
                defaultValue={data.total_family}
                onChange={handleInputChange}
                className="border border-gray-300 p-2 rounded-md mt-1"
                required
              />
            </div>
            {data.pictures && (
              <div className="space-y-4">
                {data.pictures.map((picture, index) => (
                  <div key={index} className="flex flex-col">
                    <label
                      htmlFor={`image_url_${index}`}
                      className="text-sm font-medium text-gray-600"
                    >
                      Picture {index + 1}
                    </label>
                    <input
                      type="text"
                      id={`image_url_${index}`}
                      name="image_url"
                      value={picture.image_url}
                      onChange={(e) => handlePicturesChange(index, e)}
                      className="border border-gray-300 p-2 rounded-md mt-1"
                      required
                    />
                    {picture.image_url && (
                      <img
                        src={picture.image_url}
                        alt={`Image Preview ${index}`}
                        className="mt-2 rounded-lg"
                        style={{ maxWidth: "200px" }}
                      />
                    )}
                    <label
                      htmlFor={`description_${index}`}
                      className="text-sm font-medium text-gray-600 mt-2"
                    >
                      Description {index + 1}
                    </label>
                    <input
                      type="text"
                      id={`description_${index}`}
                      name="description"
                      value={picture.description}
                      onChange={(e) => handlePicturesChange(index, e)}
                      className="border border-gray-300 p-2 rounded-md mt-1"
                      required
                    />
                  </div>
                ))}
              </div>
            )}
            <button
              type="submit"
              className={`bg-blue-500 text-white px-4 py-2 rounded-md mt-4 ${
                !formChanged ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={!formChanged}
            >
              Save Changes
            </button>
          </form>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </DashboardLayout>
  );
}

export default EditAdvertise;
