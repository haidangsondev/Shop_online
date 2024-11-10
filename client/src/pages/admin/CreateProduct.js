import { apiCreateProduct } from "apis";
import { Button, InputForm, MarkDown, SelectForm } from "components";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { toBase64, validate } from "utils/helper";
function CreateProduct() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm({});
  const { productCategories } = useSelector((state) => state.app);
  const [payload, setPayload] = useState({
    description: "",
  });
  const [invaliFields, setInvaliFields] = useState([]);
  const [preview, setPriview] = useState({
    thumb: null,
    images: [],
  });
  const changeValue = useCallback(
    (e) => {
      setPayload(e);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [payload]
  );

  const handleSubmitCreateProduct = async (data) => {
    const invalids = validate(payload, setInvaliFields);
    if (invalids === 0) {
      if (data?.category)
        data.category = productCategories.find(
          (item) => item._id === data.category
        )?.title;
      const finalPayload = { ...data, ...payload };
      const formData = new FormData();
      for (let result of Object.entries(finalPayload))
        formData.append(result[0], result[1]);
      if (finalPayload.thumb) formData.append("thumb", finalPayload.thumb[0]);
      if (finalPayload.images) {
        for (let image of finalPayload.images) formData.append("images", image);
      }

      const response = await apiCreateProduct(formData);
      if (response?.success) {
        toast.success(response.message);
        reset();
        setPriview({
          thumb: "",
          images: [],
        });
      } else {
        toast.error(response.message);
      }
    }
  };

  const handlePreviewImages = async (files) => {
    console.log(files);
    if (files.length > 0) {
      const imagesPreview = [];
      for (let file of files) {
        if (file.type !== "image/png" && file.type !== "image/jpeg") {
          toast.warning("Không đúng định dạng file");
          return;
        }
        const base64 = await toBase64(file);
        imagesPreview.push({ name: file.name, path: base64 });
      }
      if (imagesPreview.length > 0)
        setPriview((pre) => ({ ...pre, images: imagesPreview }));
    }
  };
  const handlePreviewThumb = async (file) => {
    const base64 = await toBase64(file);
    setPriview((pre) => ({ ...pre, thumb: base64 }));
  };
  useEffect(() => {
    handlePreviewThumb(watch("thumb")[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch("thumb")]);

  useEffect(() => {
    handlePreviewImages(watch("images"));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [watch("images")]);

  return (
    <div className="w-full">
      {" "}
      <h1 className="h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b">
        <span>Tạo sản phẩm</span>
      </h1>
      <div className="p-4">
        <form onSubmit={handleSubmit(handleSubmitCreateProduct)}>
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
                code: item._id,
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
                ?.find((item) => item._id === watch("category"))
                ?.brand?.map((element) => ({ code: element, value: element }))}
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
          />
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
                  src={item.path}
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

export default CreateProduct;
