import express from 'express';
import { createListing, deleteListing, updateListing,  } from '../controller/listing.controller.js';
import { verifyToken } from '../utils/verifyUser.js';
import { getListing } from '../controller/auth.controller.js';

const router = express.Router();


router.post('/create', verifyToken, createListing);
router.delete('/delete/:id', verifyToken, deleteListing);
router.post('/update/:id', verifyToken, updateListing);
router.get('/get/:id', getListing);



export default router;
