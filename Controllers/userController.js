import blogmodel from "../Models/blog.model.js";
import commentmodel from "../Models/comment.model.js";

export const createBlog = async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.json({ success: false, message: "Fill complete Data" });
  }

  try {
    let blog = await blogmodel.create(
      {
        title,
        content,
        authorId: req.body.userId,
      },
      {
        tableName: "blogs",
      }
    );

    if (blog) {
      return res.json({ success: true, message: "Blog Posted" });
    } else {
      return res.json({ success: false, message: "Something went wrong" });
    }
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const getBlog = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.json({ succes: false, message: "ID not found in params" });
  }

  try {
    let blog = await blogmodel.findOne({
      where: { id: id },
    });

    if (!blog) {
      return res.json({ success: false, message: "Something went wrong" });
    }

    return res.json({ success: true, blog });
  } catch (error) {
    return res.json({ succes: false, message: error.message });
  }
};

export const deleteBlog = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.json({ success: false, message: "Send id from params" });
  }

  try {
    let blog = await blogmodel.destroy({
      where: { id: id },
    });

    return res.json({ success: true, message: "Blog Deleted" });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const comment = async (req, res) => {
  const { text } = req.body;
  const { id } = req.params;

  if (!text || !id) {
    return res.json({ success: false, message: "Something went wrong" });
  }
  try {
    let comment = await commentmodel.create({
      text,
      userId: req.body.userId,
      blogId: id,
    });

    if (comment) {
      return res.json({ success: true, message: "Comment succesfull" });
    } else {
      return res.json({ success: false, message: "Something went wrong" });
    }
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const deletecomment = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.json({ success: false, message: "Id is not given" });
  }
  try {
    let comment = await commentmodel.destroy({
      where: { blogId: id },
    });

    if (!comment) {
      return res.json({
        success: true,
        message: "Comment succesfully deleted",
      });
    } else {
      return res.json({ success: false, message: "Something went wrong" });
    }
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const allBlogs = async (req, res) => {
  try {
    let blogs = await blogmodel.findAll({});

    return res.json({ success: true, blogs });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};

export const allcomments = async (req, res) => {
  const { id } = req.params;

  try {
    let comments = await commentmodel.findAll({
      where: { id: id },
    });

    return res.json({ success: true, comments });
  } catch (error) {
    return res.json({ success: false, message: error.message });
  }
};
