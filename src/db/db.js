let contacts = require('./data/contacts.json')
let tasks = require('./data/tasks.json')
let users = require('./data/users.json')

module.exports = {
    // contacts
    getData: () => {
        console.log('DB call for contacts')
        return contacts
    },
    getOneContact: (id) => {
        console.log('DB call for single contact object')
        return contacts.find(d => d.id === Number(id))
    },
    setData: (new_contact_entry) => {
        console.log('DB call for inserting contact')

        const lastId = parseInt(contacts[contacts.length - 1].id)
        const newId = lastId + 1

        contacts = [...contacts, { id: newId, ...new_contact_entry }]

        return newId
    },
    updateData: (contact) => {
        console.log('DB call for updating contact', contact)

        const newArray = [...contacts]
        const index = contacts.findIndex(c => c.id == contact.id)

        newArray[index] = { ...newArray[index], ...contact }
        contacts = newArray

        return newArray[index]
    },
    deleteData: (id) => {
        console.log('DB call for deleting contact')

        const newArray = [...contacts]
        const index = contacts.findIndex(c => c.id == id)

        newArray.splice(index, 1)
        contacts = newArray

        if (index > 0)
            return "Successfully deleted contact"
        else
            return "Record does not exist"
    },
    // tasks
    getTasks: () => {
        console.log('DB call for tasks')
        return tasks
    },
    getTasksByContactId: (id) => {
        console.log('DB call for getTasksByContactId', id)
        return tasks.filter(t => t.contactId == id)
    }
}