import ticketModel from "./models/ticket.model.js";

class TicketDao {
    async findById(id) {
        return await ticketModel.findById(id);
    };

    async findOne(query) {
        return await ticketModel.findOne(query);
    };

    async save(ticketData) {
        const ticket = new ticketModel(ticketData);
        return await ticket.save();
    };

    async delete(id) {
        return await ticketModel.findByIdAndDelete(id);
    };
};

export default new TicketDao();