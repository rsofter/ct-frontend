import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { from } from 'rxjs';
import { InviteService } from '../service/invite.service';

import { InviteListComponent } from './invite-list.component';

describe('InviteListComponent', () => {
	let component: InviteListComponent;
	let fixture: ComponentFixture<InviteListComponent>;
	let service: InviteService;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [InviteListComponent],
			imports: [HttpClientModule]
		})
			.compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(InviteListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();

		service = new InviteService(null);
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});

describe('InviteListComponent and InviteService integration', () => {
	let component: InviteListComponent;
	let service: InviteService;

	beforeEach(() => {
		service = new InviteService(null);
		component = new InviteListComponent(service);
	});

	it('should set InviteList properties with the items returned from InviteService', () => {
		const inviteErrors = [
			{ errorMessage: 'error 1' },
			{ errorMessage: 'error 2' },
			{ errorMessage: 'error 3' },
		];
		const successfulInvitesCount = 5;

		spyOn(service, 'getInviteErrors').and.callFake(() => from([inviteErrors]));
		spyOn(service, 'getSuccessfulInvitesCount').and.callFake(() => from([successfulInvitesCount]));

		component.ngOnInit();

		expect(component.inviteErrors.length).toBe(inviteErrors.length);
		expect(component.successfulInvitesCount).toBe(successfulInvitesCount);
	})
});
