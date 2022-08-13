﻿using GraphQL.Types;
using GraphQL;
using TimeTrackerApp.GraphQL.GraphQLTypes;
using TimeTrackerApp.Business.Repositories;
using TimeTrackerApp.Business.Models;
using System.Collections.Generic;
using System;
using GraphQL.MicrosoftDI;
using Microsoft.AspNetCore.Http;
using TimeTrackerApp.GraphQL.GraphQLQueries.VacationLevelGraphql;
using TimeTrackerApp.GraphQL.GraphQLTypes.CalendarTypes;
using TimeTrackerApp.Helpers;

namespace TimeTrackerApp.GraphQL.GraphQLQueries
{
    public class AppQuery : ObjectGraphType
    {
        public AppQuery(ICalendarRepository calendarRepository,IAuthenticationTokenRepository authenticationTokenRepository, IRecordRepository recordRepository, IUserRepository userRepository, IVacationRepository vacationRepository)
        {
            Field<ListGraphType<UserType>, IEnumerable<User>>()
               .Name("FetchAllUsers")
               .ResolveAsync(async context =>
               {
                   return await userRepository.FetchAllAsync();
               })
               .AuthorizeWithPolicy("LoggedIn");

            Field<UserType, User>()
                .Name("GetUserById")
                .Argument<NonNullGraphType<IdGraphType>, int>("Id", "User id")
                .ResolveAsync(async context =>
                {
                    int id = context.GetArgument<int>("Id");
                    return await userRepository.GetByIdAsync(id);
                })
                .AuthorizeWithPolicy("LoggedIn");

            Field<UserType, User>()
                .Name("GetUserByEmail")
                .Argument<NonNullGraphType<StringGraphType>, string>("Email", "User email")
                .ResolveAsync(async context =>
                {
                    string email = context.GetArgument<string>("Email");
                    return await userRepository.GetByEmailAsync(email);
                })
                .AuthorizeWithPolicy("LoggedIn");

            Field<ListGraphType<RecordType>, IEnumerable<Record>>()
                .Name("FetchAllRecords")
                .ResolveAsync(async context =>
                {
                    return await recordRepository.FetchAllAsync();
                })
                .AuthorizeWithPolicy("LoggedIn");

            Field<RecordType, Record>()
                .Name("GetRecordById")
                .Argument<NonNullGraphType<IdGraphType>, int>("Id", "Record id")
                .ResolveAsync(async context =>
                {
                    int id = context.GetArgument<int>("Id");
                    return await recordRepository.GetByIdAsync(id);
                })
                .AuthorizeWithPolicy("LoggedIn");

            Field<ListGraphType<RecordType>, IEnumerable<Record>>()
                .Name("FetchAllUserRecords")
                .Argument<NonNullGraphType<IdGraphType>, int>("UserId", "User id")
                .ResolveAsync(async context =>
                {
                    int userId = context.GetArgument<int>("UserId");
                    return await recordRepository.FetchAllUserRecordsAsync(userId);
                })
                .AuthorizeWithPolicy("LoggedIn");
            
            Field<ListGraphType<VacationType>, List<Vacation>>()
                .Name("FetchAllVacationRequests")
                .ResolveAsync(async context =>
                {
                    return await vacationRepository.FetchAllAsync();
                })
                .AuthorizeWithPolicy("LoggedIn");
            
            Field<VacationType, Vacation>()
                .Name("GetVacationRequestById")
                .Argument<NonNullGraphType<IdGraphType>>("Id", "Vacation request id")
                .ResolveAsync(async context =>
                {
                    int id = context.GetArgument<int>("Id");
                    return await vacationRepository.GetByIdAsync(id);
                })
                .AuthorizeWithPolicy("LoggedIn");
            
            Field<ListGraphType<VacationType>, IEnumerable<Vacation>>()
                .Name("FetchAllUserVacationRequests")
                .Argument<NonNullGraphType<IdGraphType>>("UserId", "User id")
                .ResolveAsync(async context =>
                {
                    int userId = context.GetArgument<int>("UserId");
                    return await vacationRepository.FetchAllUserVacationAsync(userId);
                })
                .AuthorizeWithPolicy("LoggedIn");

            Field<ListGraphType<AuthTokenType>, IEnumerable<AuthenticationToken>>()
                .Name("FetchAllAuthenticationTokens")
                .ResolveAsync(async context =>
                {
                    return await authenticationTokenRepository.FetchAllAsync();
                })
                .AuthorizeWithPolicy("LoggedIn");

            Field<AuthTokenType, AuthenticationToken>()
                .Name("GetAuthenticationTokenById")
                .Argument<NonNullGraphType<IdGraphType>, int>("Id", "Authentication token id")
                .ResolveAsync(async context =>
                {
                    int id = context.GetArgument<int>("Id");
                    return await authenticationTokenRepository.GetByIdAsync(id);
                })
                .AuthorizeWithPolicy("LoggedIn");

            Field<AuthTokenType, AuthenticationToken>()
                .Name("GetAuthenticationTokenByUserId")
                .Argument<NonNullGraphType<IdGraphType>, int>("UserId", "User id")
                .ResolveAsync(async context =>
                {
                    int userId = context.GetArgument<int>("UserId");
                    return await authenticationTokenRepository.GetByUserIdAsync(userId);
                })
                .AuthorizeWithPolicy("LoggedIn");

            Field<ListGraphType<CalendarType>, List<Calendar>>()
                .Name("getEvents")
                .ResolveAsync(async context =>
                {
                    return await calendarRepository.GetAllEvents();
                });


            Field<ListGraphType<CalendarType>, IEnumerable<Calendar>>()
                .Name("getRangeEvents")
                .Argument<DateGraphType>("startDate", "start date")
                .Argument<DateGraphType>("finishDate", "finish date")
                .ResolveAsync(async context =>
                {
                    DateTime startDate = context.GetArgument<DateTime>("startDate"),
                    finishDate = context.GetArgument<DateTime>("finishDate");
                    return await calendarRepository.GetEventRange(startDate, finishDate);
                });


            Field<CalendarType, Calendar>()
                .Name("getEventById")
                .Argument<NonNullGraphType<IdGraphType>>("eventId", "event id")
                .ResolveAsync(async context =>
                {
                    
                    var id = context.GetArgument<int>("eventId");
                    return await calendarRepository.GetEventById(id);
                });

            Field<ListGraphType<VacationType>, List<Vacation>>()
                .Name("getRequestVaction")
                .Argument<IntGraphType, int>("receiverId", "")
                .ResolveAsync(async contex =>
                {
                    var id = contex.GetArgument<int>("receiverId");
                    return await vacationRepository.GetRequestVacation(id);
                });
                
                Field<VacationLevelQueries>()
                .Name("VacationLevelQueries")
                .Resolve(_ => new { });
        }
    }
}