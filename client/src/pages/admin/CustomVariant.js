import { Button, InputForm } from "components";
import { memo, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { toBase64 } from "utils/helper";

function CustomVariant({ setCustomVariant, customVariant, render }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({});
  const [preview, setPriview] = useState({
    thumb: null,
    images: [],
  });
  useEffect(() => {
    reset({
      title: customVariant?.title,
      price: customVariant?.price,
      color: customVariant?.title,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customVariant]);

  const handleSubmitVariant = (data) => {
    console.log(data);
  };

  const handlePreviewImages = async (files) => {
    let imagesPreview = [];
    for (let file of files) {
      if (file.type !== "image/png" && file.type !== "image/jpeg") {
        toast.warning("Không đúng định dạng file");
        return;
      }
      const base64 = await toBase64(file);
      imagesPreview.push(base64);
    }
    if (imagesPreview.length > 0)
      setPriview((pre) => ({ ...pre, images: imagesPreview }));
  };
  const handlePreviewThumb = async (file) => {
    const base64 = await toBase64(file);
    setPriview((pre) => ({ ...pre, thumb: base64 }));
  };

  useEffect(() => {
    if (watch("thumb") instanceof FileList && watch("thumb").legth > 0)
      handlePreviewThumb(watch("thumb")[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch("thumb")]);

  useEffect(() => {
    if (watch("images") instanceof FileList && watch("images").legth > 0) {
      handlePreviewImages(watch("images"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch("images")]);
  return (
    <div className="w-full pl-8 flex flex-col gap-4 relative">
      <div className="h-[69px] w-full"></div>
      <div className="p-4 border-b  bg-white flex justify-between items-center fixed right-0 left-[270px] top-0">
        <h1 className=" text-3xl font-bold tracking-tight">
          Cập nhật sản phẩm
        </h1>
        <span
          className="text-white  cursor-pointer bg-gray-700 px-5 py-2 hover:bg-gray-600"
          onClick={() => setCustomVariant(null)}
        >
          Hủy
        </span>
      </div>
      <form
        onSubmit={handleSubmit(handleSubmitVariant)}
        className="p-4 w-full flex flex-col gap-4"
      >
        <div className="flex w-full items-center gap-4">
          <InputForm
            label="Tên sản phẩm"
            register={register}
            errors={errors}
            id="title"
            // eslint-disable-next-line react/style-prop-object
            style="flex-auto focus:outline-none focus:border-gray-300"
            disabled={true}
            readOnly={true}
            fullWidth
          />
          <InputForm
            label="Gía tiền"
            register={register}
            errors={errors}
            id="price"
            // eslint-disable-next-line react/style-prop-object
            style="flex-auto focus:outline-none focus:border-gray-300"
            disabled={true}
            readOnly={true}
            fullWidth
          />
          <InputForm
            label="Màu sắc"
            register={register}
            errors={errors}
            id="color"
            // eslint-disable-next-line react/style-prop-object
            style="flex-auto focus:outline-none focus:border-gray-300"
            disabled={true}
            readOnly={true}
            fullWidth
          />
        </div>
        <div className="flex w-full gap-4 my-6">
          <InputForm
            label="Gía tiền"
            register={register}
            errors={errors}
            id="customPrice"
            validate={{ required: "Trường là bắt buộc" }}
            fullWidth
            placeholder="VND"
            type="number"
            // eslint-disable-next-line react/style-prop-object
            style={"flex-1"}
          />
          <InputForm
            label="Màu sắc"
            register={register}
            errors={errors}
            id="customColor"
            validate={{ required: "Trường là bắt buộc" }}
            fullWidth
            placeholder="đen,đỏ,xanh,..."
            // eslint-disable-next-line react/style-prop-object
            style={"flex-1"}
          />
        </div>
        <div className="flex flex-col gap-2 mt-8">
          <label htmlFor="thumb" className="font-semibold">
            Cập nhật ảnh bìa
          </label>
          <input
            id="thumb"
            type="file"
            {...register("thumb", { required: "Trường là bắt buộc" })}
          />
          {errors["thumb"] && (
            <small className="text-xs text-red-500">
              {errors["thumb"]?.message}
            </small>
          )}
        </div>
        {preview.thumb && (
          <div className="my-4">
            <img src={preview.thumb} alt="thumbnail" />
          </div>
        )}
        <div className="flex flex-col gap-2 mt-8">
          <label htmlFor="products" className="font-semibold">
            Chọn ảnh cho sản phẩm
          </label>
          <input
            id="images"
            type="file"
            multiple
            {...register("images", { required: "Trường là bắt buộc" })}
          />
          {errors["products"] && (
            <small className="text-xs text-red-500">
              {errors["products"]?.message}
            </small>
          )}
        </div>
        {preview.images.length > 0 && (
          <div className="my-4 flex w-full gap-3 flex-wrap">
            {preview?.images?.map((item, index) => (
              <img
                key={index}
                src={item}
                alt="product"
                className="w-[200px] object-cover "
              />
            ))}
          </div>
        )}
        <Button type="submit">Cập nhật biến thể sản phẩm</Button>
      </form>
    </div>
  );
}

export default memo(CustomVariant);
