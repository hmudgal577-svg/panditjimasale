const { Address } = require('../models');

const getAddresses = async (req, res, next) => {
  try {
    const addresses = await Address.findAll({ where: { userId: req.user.id }, order: [['isDefault', 'DESC'], ['createdAt', 'DESC']] });
    res.json({ success: true, addresses });
  } catch (error) {
    next(error);
  }
};

const createAddress = async (req, res, next) => {
  try {
    const data = { ...req.body, userId: req.user.id };
    if (data.isDefault) {
      await Address.update({ isDefault: false }, { where: { userId: req.user.id } });
    }
    if (!data.isDefault) {
      const count = await Address.count({ where: { userId: req.user.id } });
      if (count === 0) data.isDefault = true;
    }
    const address = await Address.create(data);
    res.status(201).json({ success: true, address });
  } catch (error) {
    next(error);
  }
};

const updateAddress = async (req, res, next) => {
  try {
    const address = await Address.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!address) return res.status(404).json({ success: false, message: 'Address not found' });
    const data = { ...req.body };
    if (data.isDefault) {
      await Address.update({ isDefault: false }, { where: { userId: req.user.id } });
    }
    await address.update(data);
    res.json({ success: true, address });
  } catch (error) {
    next(error);
  }
};

const deleteAddress = async (req, res, next) => {
  try {
    const address = await Address.findOne({ where: { id: req.params.id, userId: req.user.id } });
    if (!address) return res.status(404).json({ success: false, message: 'Address not found' });
    await address.destroy();
    res.json({ success: true, message: 'Address deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAddresses, createAddress, updateAddress, deleteAddress };
