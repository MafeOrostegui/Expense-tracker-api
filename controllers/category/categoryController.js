const {
  findCategories,
  findById,
  create,
  editById,
  deleteById,
} = require('../../models/category');

const getCategories = async (req, res) => {
  try {
    const userId = req.user.id;

    const categories = await findCategories({
      $or: [{ userId }, { userId: null }],
    });

    if (categories.length <= 0) {
      return res.status(404).json({ message: 'Categories not found' });
    }

    return res.status(200).json(categories);
  } catch (error) {
    console.error('Error in get categories:', error);
    return res.status(500).json({ err: 'Internal server error' });
  }
};

const getCategory = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('ID in request:', id);
    const category = await findById(id);

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    return res.status(200).json(category);
  } catch (error) {
    console.error('Error in get category:', error);
    return res.status(500).json({ err: 'Internal server error' });
  }
};

const createCategory = async (req, res) => {
  const { name, type } = req.body;
  const userId = req.user.id;

  try {
    if (!name || !type) {
      return res
        .status(400)
        .json({ err: 'Please provide the requested fields' });
    }

    const newCategory = await create({ name, type, userId });

    return res.status(201).json(newCategory);
  } catch (error) {
    console.error('Error creating the category:', error);
    return res.status(500).json({ err: 'Internal server error' });
  }
};

const editCategory = async (req, res) => {
  const newData = req.body;

  try {
    const { id } = req.params;
    if (!newData.name && !newData.type) {
      return res
        .status(400)
        .json({ err: 'There are no changes in the fields' });
    }

    const modifiedCategory = await editById(id, newData);

    if (!modifiedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    return res.status(200).json(modifiedCategory);
  } catch (error) {
    console.error('Error in edit category:', error);
    return res.status(500).json({ err: 'Internal server error' });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCategory = await deleteById(id);

    if (!deletedCategory) {
      return res.status(404).json({ message: 'Category not found' });
    }

    return res.status(200).json({ message: 'Category deleted.' });
  } catch (error) {
    console.error('Error in delete category:', error);
    return res.status(500).json({ err: 'Internal server error' });
  }
};

module.exports = {
  getCategories,
  getCategory,
  createCategory,
  editCategory,
  deleteCategory,
};
