import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { VerbDefinition } from './verb-definition.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<VerbDefinition>;

@Injectable()
export class VerbDefinitionService {

    private resourceUrl =  SERVER_API_URL + 'api/verb-definitions';

    constructor(private http: HttpClient) { }

    create(verbDefinition: VerbDefinition): Observable<EntityResponseType> {
        const copy = this.convert(verbDefinition);
        return this.http.post<VerbDefinition>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(verbDefinition: VerbDefinition): Observable<EntityResponseType> {
        const copy = this.convert(verbDefinition);
        return this.http.put<VerbDefinition>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<VerbDefinition>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<VerbDefinition[]>> {
        const options = createRequestOption(req);
        return this.http.get<VerbDefinition[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<VerbDefinition[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: VerbDefinition = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<VerbDefinition[]>): HttpResponse<VerbDefinition[]> {
        const jsonResponse: VerbDefinition[] = res.body;
        const body: VerbDefinition[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to VerbDefinition.
     */
    private convertItemFromServer(verbDefinition: VerbDefinition): VerbDefinition {
        const copy: VerbDefinition = Object.assign({}, verbDefinition);
        return copy;
    }

    /**
     * Convert a VerbDefinition to a JSON which can be sent to the server.
     */
    private convert(verbDefinition: VerbDefinition): VerbDefinition {
        const copy: VerbDefinition = Object.assign({}, verbDefinition);
        return copy;
    }
}
