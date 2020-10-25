import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface IUser {
	id?: number;
	email: string;
}

export interface IInviteError {
	errorMessage: string
}

@Injectable({
	providedIn: 'root'
})
export class InviteService {
	private readonly url: string = 'http://localhost:3000/users';
	// Cross-components communication properties
	private inviteErrors: IInviteError[];
	private observableInviteErrors: BehaviorSubject<IInviteError[]>;
	private inviteSuccessCount: number;
	private observableInviteSuccessCount: BehaviorSubject<number>;

	constructor(private http: HttpClient) {
		this.inviteErrors = [];
		this.observableInviteErrors = <BehaviorSubject<IInviteError[]>>new BehaviorSubject([]);

		this.inviteSuccessCount = 0;
		this.observableInviteSuccessCount = <BehaviorSubject<number>>new BehaviorSubject(0);
	}

	invite(user: IUser): Observable<any> {
		return this.http.post<IUser>(this.url, user)
			.pipe(
				catchError(this.handleError)
			)
	}

	handleError(error: HttpErrorResponse): Observable<IInviteError> {
		let errorMessage = '';
		if (error.error instanceof ErrorEvent) {
			// client-side error
			errorMessage = `Error: ${error.error.message}`;
		} else {
			// server-side error
			errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
		}
		return of({ errorMessage });
	}

	logInviteError(error: IInviteError) {
		this.inviteErrors.push(error);
		this.observableInviteErrors.next(this.inviteErrors);
	}

	getInviteErrors() {
		return this.observableInviteErrors.asObservable();
	}

	addSuccessfulInvite() {
		this.inviteSuccessCount++;
		this.observableInviteSuccessCount.next(this.inviteSuccessCount);
	}

	getSuccessfulInvitesCount() {
		return this.observableInviteSuccessCount.asObservable();
	}
}
