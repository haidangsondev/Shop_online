import React, { memo } from "react";
import { Editor } from "@tinymce/tinymce-react";

function MarkDown({
  label,
  value,
  changeValue,
  name,
  invaliFields,
  setInvalidFields,
}) {
  return (
    <div className="flex flex-col">
      <span>{label}</span>
      <Editor
        apiKey="9mb1qyu6fduojmbcr18noiacvejkfkx65pashrczzfg43suz"
        init={{
          height: 500,
          menubar: true,
          plugins: [
            // Core editing features
            "anchor",
            "autolink",
            "charmap",
            "codesample",
            "emoticons",
            "image",
            "link",
            "lists",
            "media",
            "searchreplace",
            "table",
            "visualblocks",
            "wordcount",
            // Your account includes a free trial of TinyMCE premium features
            // Try the most popular premium features until Sep 22, 2024:
            "checklist",
            "mediaembed",
            "casechange",
            "export",
            "formatpainter",
            "pageembed",
            "a11ychecker",
            "tinymcespellchecker",
            "permanentpen",
            "powerpaste",
            "advtable",
            "advcode",
            "editimage",
            "advtemplate",
            "ai",
            "mentions",
            "tinycomments",
            "tableofcontents",
            "footnotes",
            "mergetags",
            "autocorrect",
            "typography",
            "inlinecss",
            "markdown",
          ],
          toolbar:
            "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
          tinycomments_mode: "embedded",
          tinycomments_author: "Author name",
          mergetags_list: [
            { value: "First.Name", title: "First Name" },
            { value: "Email", title: "Email" },
          ],
          content_style: "",
        }}
        initialValue={value}
        onChange={(e) =>
          changeValue((pre) => ({ ...pre, [name]: e.target.getContent() }))
        }
        onFocus={() => setInvalidFields && setInvalidFields([])}
      />
      {invaliFields?.some((item) => item.name === name) && (
        <small className="text-main text-sm">
          {invaliFields?.find((element) => element.name === name)?.message}
        </small>
      )}
    </div>
  );
}

export default memo(MarkDown);
