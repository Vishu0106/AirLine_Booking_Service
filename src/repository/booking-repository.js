const { Booking }   = require('../models/index');
const { StatusCodes } = require('http-status-codes');
const { AppError, ValidationError} = require('../utils/errors/index');
class BookingRepository {
    async createBooking(data) {
        try {
            const booking = await Booking.create(data);
            return booking;
        } catch (error) {
            if(error.name == 'SequelizeValidationError') {
                throw new ValidationError(error);
            }
            throw new AppError('ServerError',
                'Cannot create Booking',
                'Logical Issue Found while creating booking',
                StatusCodes.INTERNAL_SERVER_ERROR
            )
        }
    }
}