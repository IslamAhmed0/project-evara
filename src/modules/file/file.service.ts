import { Injectable } from '@nestjs/common';
import * as fs from 'fs'
import * as buffer from "buffer";
import {readFile} from "fs";
@Injectable()
export class FileService {

    async upload(req, file) {
        const response = {
            originalname: file.originalname,
            filename: file.filename,
        };
        return response;

    }
}