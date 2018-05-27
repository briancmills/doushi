import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { UserVerbFormLevel } from './user-verb-form-level.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<UserVerbFormLevel>;

@Injectable()
export class UserVerbFormLevelService {

    private resourceUrl =  SERVER_API_URL + 'api/user-verb-form-levels';

    constructor(private http: HttpClient) { }

    create(userVerbFormLevel: UserVerbFormLevel): Observable<EntityResponseType> {
        const copy = this.convert(userVerbFormLevel);
        return this.http.post<UserVerbFormLevel>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(userVerbFormLevel: UserVerbFormLevel): Observable<EntityResponseType> {
        const copy = this.convert(userVerbFormLevel);
        return this.http.put<UserVerbFormLevel>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<UserVerbFormLevel>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    findMine(): Observable<HttpResponse<UserVerbFormLevel[]>> {
        return this.http.get<UserVerbFormLevel[]>(`${this.resourceUrl}/mine`, { observe: 'response'})
            .map((res: HttpResponse<UserVerbFormLevel[]>) => this.convertArrayResponse(res));
    }

    query(req?: any): Observable<HttpResponse<UserVerbFormLevel[]>> {
        const options = createRequestOption(req);
        return this.http.get<UserVerbFormLevel[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<UserVerbFormLevel[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: UserVerbFormLevel = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<UserVerbFormLevel[]>): HttpResponse<UserVerbFormLevel[]> {
        const jsonResponse: UserVerbFormLevel[] = res.body;
        const body: UserVerbFormLevel[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to UserVerbFormLevel.
     */
    private convertItemFromServer(userVerbFormLevel: UserVerbFormLevel): UserVerbFormLevel {
        const copy: UserVerbFormLevel = Object.assign({}, userVerbFormLevel);
        return copy;
    }

    /**
     * Convert a UserVerbFormLevel to a JSON which can be sent to the server.
     */
    private convert(userVerbFormLevel: UserVerbFormLevel): UserVerbFormLevel {
        const copy: UserVerbFormLevel = Object.assign({}, userVerbFormLevel);
        return copy;
    }
}
