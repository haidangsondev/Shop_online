import { apiUpdateProduct } from "apis";
import { Button, InputForm, MarkDown, SelectForm } from "components";
import { memo, useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { toBase64, validate } from "utils/helper";

function UpdateProduct({ render, editProduct, setEditProduct }) {
  const [payload, setPayload] = useState({
    description: "",
  });
  const [invaliFields, setInvaliFields] = useState([]);
  const [preview, setPriview] = useState({
    thumb: null,
    images: [],
  });
  const { productCategories } = useSelector((state) => state.app);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({});

  useEffect(() => {
    reset({
      title: editProduct?.title || "",
      price: editProduct?.price || "",
      quantity: editProduct?.quantity || "",
      color: editProduct?.color || "",
      category: editProduct?.category || "",
      brand: editProduct?.brand?.toLowerCase() || "",
    });
    setPayload({
      description:
        typeof editProduct?.description === "object"
          ? editProduct?.description.join(",")
          : editProduct?.description,
    });
    setPriview({
      thumb: editProduct?.thumb || "",
      images: editProduct?.images || [],
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editProduct]);

  const changeValue = useCallback(
    (e) => {
      setPayload(e);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [payload]
  );
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

  const handleSubmitUpdateProduct = async (data) => {
    const invalids = validate(payload, setInvaliFields);
    if (invalids === 0) {
      if (data?.category)
        data.category = productCategories.find(
          (item) => item.title === data.category
        )?.title;
      const finalPayload = { ...data, ...payload };
      finalPayload.thumb =
        data?.thumb?.length === 0 ? preview.thumb : data.thumb[0];
      const formData = new FormData();
      for (let result of Object.entries(finalPayload))
        formData.append(result[0], result[1]);
      finalPayload.images =
        data?.images?.length === 0 ? preview.images : data.images;

      for (let image of finalPayload.images) formData.append("images", image);

      const response = await apiUpdateProduct(formData, editProduct._id);
      console.log(response);
      if (response?.success) {
        toast.success(response.message);
        render();
        setEditProduct(null);
      } else {
        toast.error(response.message);
      }
    }
  };
  return (
    <div className="w-full pl-8 flex flex-col gap-4 relative">
      <div className="h-[69px] w-full"></div>
      <div className="p-4 border-b  bg-white flex justify-between items-center fixed right-0 left-[270px] top-0">
        <h1 className=" text-3xl font-bold tracking-tight">
          Cập nhật sản phẩm
        </h1>
        <span
          className="text-white  cursor-pointer bg-gray-700 px-5 py-2 hover:bg-gray-600"
          onClick={() => setEditProduct(null)}
        >
          Hủy
        </span>
      </div>
      <div className="p-4">
        <form onSubmit={handleSubmit(handleSubmitUpdateProduct)}>
          <InputForm
            label="Tên sản phẩm"
            register={register}
            errors={errors}
            id="title"
            validate={{ required: "Trường là bắt buộc" }}
            fullWidth
            placeholder="sản phẩm...."
          />
          <div className="flex w-full gap-4 my-6">
            <InputForm
              label="Gía tiền"
              register={register}
              errors={errors}
              id="price"
              validate={{ required: "Trường là bắt buộc" }}
              fullWidth
              placeholder="VND"
              type="number"
              // eslint-disable-next-line react/style-prop-object
              style={"flex-1"}
            />
            <InputForm
              label="Số lượng"
              register={register}
              errors={errors}
              id="quantity"
              validate={{ required: "Trường là bắt buộc" }}
              fullWidth
              placeholder="1"
              type="number"
              // eslint-disable-next-line react/style-prop-object
              style={"flex-1"}
            />
            <InputForm
              label="Màu sắc"
              register={register}
              errors={errors}
              id="color"
              validate={{ required: "Trường là bắt buộc" }}
              fullWidth
              placeholder="đen,đỏ,xanh,..."
              // eslint-disable-next-line react/style-prop-object
              style={"flex-1"}
            />
          </div>
          <div className="flex w-full gap-4 my-6">
            <SelectForm
              label="Loại"
              options={productCategories?.map((item) => ({
                code: item.title,
                value: item.title,
              }))}
              register={register}
              id={"category"}
              validate={{ required: "Trường là bắt buộc" }}
              // eslint-disable-next-line react/style-prop-object
              style={"flex-auto"}
              errors={errors}
              fullWidth
            />
            <SelectForm
              label="Thương hiệu"
              options={productCategories
                ?.find((item) => item.title === watch("category"))
                ?.brand?.map((element) => ({
                  code: element.toLowerCase(),
                  value: element,
                }))}
              register={register}
              id={"brand"}
              // eslint-disable-next-line react/style-prop-object
              style={"flex-auto"}
              errors={errors}
              fullWidth
            />
          </div>
          <MarkDown
            name="description"
            changeValue={changeValue}
            label="Description"
            invaliFields={invaliFields}
            setInvalidFields={setInvaliFields}
            value={payload.description}
          />
          <div className="flex flex-col gap-2 mt-8">
            <label htmlFor="thumb" className="font-semibold">
              Cập nhật ảnh bìa
            </label>
            <input id="thumb" type="file" {...register("thumb")} />
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
            <input id="images" type="file" multiple {...register("images")} />
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
          <Button type="submit">Cập nhật sản phẩm</Button>
        </form>
      </div>
    </div>
  );
}

export default memo(UpdateProduct);
