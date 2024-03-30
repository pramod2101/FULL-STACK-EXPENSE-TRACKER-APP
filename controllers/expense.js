const Users=require('../Models/userModel')

exports.getDetails=(req,res,next)=>{
    Users.findAll()
        .then((result)=>{
            console.log(result);
            res.json(result)
        })
        .catch(err=>{
            console.log(err);
        })
}

exports.postDetails = (req, res, next) => {
    let data = req.body;
    console.log("Received data:", data); // Log received data for debugging

    if (!data || !data.expenseAmount || !data.chooseDescreption || !data.chooseCategory) {
        console.error("Invalid data received:", data);
        return res.status(400).json({ error: 'Invalid data received' });
    }

    Users.create({
        expenseAmount: data.expenseAmount,
        chooseDescreption: data.chooseDescreption,
        chooseCategory: data.chooseCategory
    })
    .then(result => {
        console.log("Expense created:", result); // Log created expense for confirmation
        res.status(201).json(result);
    })
    .catch(err => {
        console.error("Error creating expense:", err); // Log detailed error for troubleshooting
        res.status(500).json({ error: 'Internal error' });
    });
};

exports.deleteDetails=(req,res,next)=>{
    let deleteId=req.params.id
    Users.destroy({where:{id:deleteId}})
    .then(result=>{
        console.log("deleted from db");
        res.status(204).send()
    })
}
exports.editDetails = (req, res, next) => {
    let updateId = req.params.id;
    let updatedData = req.body;
    console.log("Received data for update:", updatedData); // Log received data for debugging

    Users.update(updatedData, { where: { id: updateId } })
        .then(result => {
            console.log("Expense updated:", result); // Log updated expense for confirmation
            res.status(200).json({ message: 'Expense updated successfully' });
        })
        .catch(err => {
            console.error("Error updating expense:", err); // Log detailed error for troubleshooting
            res.status(500).json({ error: 'Internal error' });
        });
};

