import { FirebaseService } from './../../_service/firebase.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { ProfileCard, noteListName } from '../../_interface/profile-card';
import { COMMA, ENTER} from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-card',
  templateUrl: './edit-card.component.html',
  styleUrls: ['./edit-card.component.scss']
})
export class EditCardComponent implements OnInit, OnDestroy {

  @ViewChild('myModal') public myModal: ModalDirective;

  urlId: string;
  docId: string;
  pCard: ProfileCard;
  noteListName = noteListName;

  editToggle = {
    title: false,
    job: false,
    department: false,
    noteList: [
      false, false, false, false, false
    ]
  };

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  fruits: any[] = [
    {name: 'Lemon', class: 'blue'},
    {name: 'Lime', class: 'blue'},
    {name: 'Apple', class: 'blue'},
    {name: '1', class: 'blue'},
    {name: '2', class: 'blue'},
    {name: '3', class: 'blue'},
    {name: '4', class: 'blue'},
    {name: '8', class: 'blue'},
  ];

  profileCardSub: Subscription;

  constructor(private firebaseService: FirebaseService,
    private route: ActivatedRoute,
    private router: Router) {
    // this.pCard = {
    //   name: '熊庭緯',
    //   age: 25,
    //   gender: '男',
    //   constellation: '獅子座',
    //   location: '台北市',
    //   job: '工程師',
    //   department: '資工系',
    //   noteList: [
    //     {
    //       keywords: [{name: '游泳', class: 'blue'}],
    //       content: '運動'
    //     },
    //     {
    //       keywords: [{name: '親情', class: 'blue'}],
    //       content: '親情內容'
    //     },
    //     {
    //       keywords: [{name: '友情', class: 'blue'}],
    //       content: '友情內容'
    //     },
    //     {
    //       keywords: [{name: '愛情', class: 'blue'}],
    //       content: '愛情內容'
    //     },
    //     {
    //       keywords: [{name: '工作', class: 'blue'}],
    //       content: '工作內容'
    //     }
    //   ]
    // };
    this.pCard = new ProfileCard();

    this.route.paramMap.subscribe(params => {
      this.urlId = params.get('id');

      if (this.urlId) {
        this.profileCardSub = firebaseService.getProfileCards().subscribe(
          (data) => {
            if (data) {
              console.log('edit-card getProfileCards: ' + JSON.stringify(data));
              this.pCard = data[this.urlId];
              this.docId = data[this.urlId].id;
            }
        });
      }
    });

  }

  ngOnInit(): void {
  }


  ngOnDestroy() {
    if (this.profileCardSub) {this.profileCardSub.unsubscribe(); }
  }


  save() {
    console.log(this.pCard);
    if (this.urlId) {
      this.firebaseService.setProfileCard(this.docId, this.pCard);
    } else {
      this.firebaseService.addProfileCard(this.pCard);
    }
    this.router.navigate(['/']);
  }


  deleteCard() {
    this.firebaseService.deleteProfileCard(this.docId);
    this.router.navigate(['/']);
  }


  add(array: any[] , cssClass: string, event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      array.push({name: value.trim(), class: cssClass});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(array: any[], item: any): void {
    const index = array.indexOf(item);

    if (index >= 0) {
      array.splice(index, 1);
    }
  }

  drop(array: any[], event: CdkDragDrop<any[]>) {
    moveItemInArray(array, event.previousIndex, event.currentIndex);
  }

}
