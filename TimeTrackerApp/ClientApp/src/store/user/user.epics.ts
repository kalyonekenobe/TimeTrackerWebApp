import { combineEpics, ofType } from "redux-observable";
import {from, map, mergeMap, Observable} from "rxjs";
import { graphqlRequest } from "../../graphql/api";
import { setUser } from "./user.slice";
import {getUserByIdQuery} from "../../graphql/queries/user.queries";
import {GetUserByIdQueryInputType, User} from "../../types/user.types";
import {Epic} from "redux-observable";
import {getUserById} from "./user.slice";


const getUserByIdEpic: Epic = (action$: Observable<ReturnType<typeof getUserById>>): any => {
    return action$.pipe(
        ofType(getUserById.type),
        mergeMap(action => from(graphqlRequest(getUserByIdQuery, {
            id: action.payload.id
        } as GetUserByIdQueryInputType)).pipe(
            map(response => {
                if (response?.data?.getUserById) {
                    const apiResponse = response.data.getUserById
                    const user = {
                        id: parseInt(apiResponse.id),
                        email: apiResponse.email ?? "",
                        firstName: apiResponse.firstName ?? "Unknown",
                        lastName: apiResponse.lastName ?? "User",
                        isFullTimeEmployee: Boolean(JSON.parse(apiResponse.isFullTimeEmployee)),
                        weeklyWorkingTime: parseInt(apiResponse.weeklyWorkingTime ?? ''),
                        remainingVacationDays: parseInt(apiResponse.remainingVacationDays ?? ''),
                        privilegesValue: parseInt(apiResponse.privilegesValue ?? '')
                    } as User
                    return setUser(user);
                }
            })
        )));
}

export const userEpics = combineEpics(getUserByIdEpic);

