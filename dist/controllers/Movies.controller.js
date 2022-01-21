"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoviesController = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
const Comment_1 = require("../entities/Comment");
const axios_1 = tslib_1.__importDefault(require("axios"));
const constants_1 = require("../shared/constants");
const utility_1 = require("src/utility/utility");
const http_status_codes_1 = require("http-status-codes");
const functions_1 = require("../shared/functions");
const convert = require('convert-length');
class MoviesController {
    constructor() { }
    GetMovies(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const filmsAPI = `${constants_1.swapi}/films`;
                const { data } = yield axios_1.default.get(filmsAPI);
                const movieIDS = data.results.map(movie => movie.episode_id);
                const commentRepository = typeorm_1.getRepository(Comment_1.Comment);
                const comments = yield commentRepository.find({ where: { episodeId: typeorm_1.In(movieIDS) } });
                const formattedResult = [];
                for (const movieListing of data.results) {
                    const listingComments = [];
                    for (const comment of comments) {
                        if (comment.episodeId === movieListing.episode_id)
                            listingComments.push(comment);
                    }
                    formattedResult.push({
                        id: movieListing.episode_id,
                        title: movieListing.title,
                        opening_crawl: movieListing.opening_crawl,
                        comments: listingComments,
                        comments_count: listingComments.length,
                        release_date: movieListing.release_date
                    });
                }
                const sorted = formattedResult.sort((a, b) => functions_1.dateToNumber(a.release_date) - functions_1.dateToNumber(b.release_date));
                res.status(http_status_codes_1.OK).send({ result: sorted });
            }
            catch (err) {
                utility_1.Utility.ErrorResponse(res, err);
            }
        });
    }
    GetCharacters(req, res) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const { sort, filter, gender_bias, page = 1, order = 1 } = req.query;
                const charactersApi = `${constants_1.swapi}/people?page=${page}`;
                const { data } = yield axios_1.default.get(charactersApi);
                let sortedResult = data.results;
                if (!!sort) {
                    if (sort === 'name')
                        sortedResult = functions_1.nameSort(data.results, order);
                    if (sort === 'height')
                        sortedResult = functions_1.heightSort(data.results, order);
                    if (sort === 'gender' && !!gender_bias) {
                        sortedResult = functions_1.genderSort(data.results, gender_bias);
                    }
                }
                if (!!filter)
                    sortedResult = functions_1.genderFilter(data.results, gender_bias);
                sortedResult = sortedResult === null || sortedResult === void 0 ? void 0 : sortedResult.map((character) => {
                    return {
                        name: character.name,
                        height: character.height,
                        mass: character.mass,
                        hair_color: character.hair_color,
                        skin_color: character.skin_color,
                        eye_color: character.eye_color,
                        birth_year: character.birth_year,
                        gender: character.gender,
                    };
                });
                const totalHeight = functions_1.heightCalculator(sortedResult);
                const meta = {
                    total_height_cm: totalHeight,
                    total_height_FT: convert(totalHeight, "cm", "ft", { precision: 3 }),
                    total_height_IN: convert(totalHeight, "cm", "in", { precision: 3 }),
                    next_page: data.next,
                    count: sortedResult.length,
                };
                const result = { data: sortedResult, meta_data: meta };
                res.status(http_status_codes_1.OK).json(result);
            }
            catch (error) {
                utility_1.Utility.ErrorResponse(res, error);
            }
        });
    }
}
exports.MoviesController = MoviesController;
