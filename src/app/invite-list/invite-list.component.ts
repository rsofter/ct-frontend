import { Component, OnInit } from '@angular/core';
import { InviteService, IInviteError } from '../service/invite.service';

@Component({
	selector: 'app-invite-list',
	templateUrl: './invite-list.component.html',
	styleUrls: ['./invite-list.component.css']
})
export class InviteListComponent implements OnInit {
	inviteErrors: IInviteError[] = [];
	successfulInvitesCount: number = 0;

	constructor(private inviteService: InviteService) { }

	ngOnInit(): void {
		this.inviteService.getInviteErrors()
			.subscribe((data: IInviteError[]) => {
				this.inviteErrors = data;
			});

		this.inviteService.getSuccessfulInvitesCount()
			.subscribe((count: number) => {
				this.successfulInvitesCount = count;
			});
	}
}
