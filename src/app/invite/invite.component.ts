import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { InviteService, IUser } from '../service/invite.service';

const users: IUser[] = [
	{ email: 'user0@comtravo.com' },
	{ email: 'user1@comtravo.com' },
	{ email: 'user2@comtravo.com' },
	{ email: 'user3@comtravo.com' },
	{ email: 'user4@comtravo.com' },
	{ email: 'user5@comtravo.com' },
	{ email: 'user6@comtravo.com' },
	{ email: 'user7@comtravo.com' },
	{ email: 'user8@comtravo.com' },
	{ email: 'user9@comtravo.com' },
	{ email: 'user10@comtravo.com' }
];

@Component({
	selector: 'app-invite',
	templateUrl: './invite.component.html',
	styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit {
	constructor(
		private inviteService: InviteService,
		private router: Router
	) { }

	ngOnInit(): void { }

	onSubmit(): void {
		from(users)
			.pipe(
				concatMap(user => this.inviteService.invite(user))
			)
			.subscribe(
				(data) => {
					if (data.errorMessage) {
						this.inviteService.logInviteError({
							errorMessage: data.errorMessage
						});
					} else {
						this.inviteService.addSuccessfulInvite();
					}
				},
				(error) => {
					// TODO: Log an error.
					console.error(error);
				},
				() => this.router.navigate(['/list']));

	}
}
