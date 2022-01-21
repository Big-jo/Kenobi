import { Request, Response } from "express";
import { getConnection, getRepository, In } from "typeorm";
import {Comment} from "../entities/Comment";
import axios from "axios";
import {swapi} from "../shared/constants"
import { Utility } from "src/utility/utility";
import { BAD_REQUEST, OK } from "http-status-codes";
import {IResult} from "../interfaces/Movies.interface";
import { dateToNumber, genderFilter, genderSort, heightCalculator, heightSort, nameSort, toFeet } from "../shared/functions";
import { ICharacter, ICharacterResult } from "src/interfaces/Character.interface";
const convert = require('convert-length');

/**
 * Controller Class For Movies
 */
export class MoviesController {

    constructor() {}

    /**
     * 
     * @param req 
     * @param res 
     * 
     * Get Movies From External API
     */
    async GetMovies(req: Request, res: Response) {
        try {
            const filmsAPI = `${swapi}/films`;

            const {data} =  await axios.get<IResult>(filmsAPI);

            /**
             * Extraxt Episode Ids From Each Movie
             */
            const movieIDS = data.results.map(movie => movie.episode_id);

            const commentRepository = getRepository(Comment);

            const comments = await commentRepository.find({where: {episodeId: In(movieIDS)}});

            const formattedResult = [];

            /**
             *  Iterate through the listings, comments and apply related comment data ( Not the best implementation in terms of scale )
             *  Would have been best to hold a mapping of listing to comment data in a redis hash
             */
            for (const movieListing of data.results) {
                const listingComments = [];

               for (const comment of comments) {
                if (comment.episodeId === movieListing.episode_id) listingComments.push(comment);
               }

                formattedResult.push({
                    id: movieListing.episode_id,
                    title: movieListing.title,
                    opening_crawl: movieListing.opening_crawl,
                    comments: listingComments,
                    comments_count: listingComments.length,
                    release_date: movieListing.release_date
                })
            }

            const sorted = formattedResult.sort((a, b) => dateToNumber(a.release_date) - dateToNumber(b.release_date));

            res.status(OK).send({result: sorted});
        } catch (err) {
            Utility.ErrorResponse(res, err);
        }
    }

    async GetCharacters(req: Request, res: Response) {
        try {
            /**
             * Sort queries - name, gender, height 
             * 
             * If sorting by gender, client should also provide a gender_bias in the query
             * 
             * gender_bias -> order by male or female. E.g 'm' or 'f
             */
            const {sort, filter, gender_bias, page = 1, order = 1} = req.query;

            const charactersApi = `${swapi}/people?page=${page}`;

            const {data} = await axios.get<ICharacterResult>(charactersApi);
            let sortedResult: any = data.results;

            // Confirm sort query to avoid unseen issues
            if (!!sort) {

                if (sort === 'name') sortedResult = nameSort(data.results, order as string);
                if (sort === 'height') sortedResult = heightSort(data.results, order as string);
                if (sort === 'gender' && !!gender_bias) {
                    sortedResult = genderSort(data.results, gender_bias as string);
                }
            }

            if (!!filter) sortedResult = genderFilter(data.results, gender_bias as string);

            //@ts-ignore
            sortedResult = sortedResult?.map((character) => {
                return {
                    name: character.name,
                    height: character.height,
                    mass: character.mass,
                    hair_color: character.hair_color,
                    skin_color: character.skin_color,
                    eye_color: character.eye_color,
                    birth_year: character.birth_year,
                    gender: character.gender,
                }
            });

            //@ts-ignore
            const totalHeight = heightCalculator(sortedResult);

            const meta = {
                total_height_cm: totalHeight,
                total_height_FT: convert(totalHeight, "cm", "ft", {precision: 3}),
                total_height_IN: convert(totalHeight, "cm", "in", {precision: 3}),
                next_page: data.next,
                count: sortedResult.length,
            }

            const result = {data: sortedResult, meta_data: meta}

            res.status(OK).json(result);
        } catch (error) {
            Utility.ErrorResponse(res, error);
        }
    }
}