import Contact from '../models/contactModel.js';

export const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getContactById = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        if (!contact) return res.status(404).json({ message: 'Contact not found' });
        res.status(200).json(contact);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createContact = async (req, res) => {
    const contact = new Contact(req.body);
    try {
        const savedContact = await contact.save();
        res.status(201).json(savedContact);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const updateContact = async (req, res) => {
    try {
        const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedContact) return res.status(404).json({ message: 'Contact not found' });
        res.status(200).json(updatedContact);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const deleteContact = async (req, res) => {
    try {
        const deletedContact = await Contact.findByIdAndDelete(req.params.id);
        if (!deletedContact) return res.status(404).json({ message: 'Contact not found' });
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const deleteAllContacts = async (req, res) => {
    try {
        await Contact.deleteMany();
        res.status(204).json();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};