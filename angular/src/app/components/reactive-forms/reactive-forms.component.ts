import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray } from '@angular/forms';
import { ReactiveFormsService } from './reactive-forms.service';

@Component({
    selector: 'stas-reactive-forms',
    templateUrl: 'reactive-forms.component.html',
    styleUrls: ['reactive-forms.component.less']
})
export class ReactiveFormsComponent implements OnInit {
    public form: FormGroup;
    public titles = ['mr', 'mrs'];

    get friends() {
        return (this.form.get('friends') as FormArray).controls;
    }

    constructor(
        private fb: FormBuilder,
        private reactiveFormsService: ReactiveFormsService
    ) { }

    ngOnInit() {
        // Without FormBuilder
        // this.form = new FormGroup({
        //     person: new FormGroup({
        //         title: new FormControl(''),
        //         name: new FormControl('')
        //     }),
        //     friends: new FormArray([ // Array of form groups
        //         new FormGroup({
        //             title: new FormControl('mrs'),
        //             name: new FormControl('Nataliia')
        //         }),
        //         new FormGroup({
        //             title: new FormControl('mr'),
        //             name: new FormControl('Alexander')
        //         })
        //     ])
        // });

        // With FormBuildet
        this.form = this.fb.group({
            person: this.fb.group({
                title: '',
                name: ''
            }),
            friends: this.fb.array([ // Array of form groups
                this.fb.group({
                    title: 'mrs',
                    name: 'Nataliia'
                }),
                this.fb.group({
                    title:'mr',
                    name: 'Alexander'
                })
            ])
        });

        this.reactiveFormsService.getFriends()
            .subscribe((data: any[]) => {
                console.log('data', data);
                data.forEach(friend => {
                    (this.form.get('friends') as FormArray).push(
                        this.fb.group({
                            title: friend.title,
                            name: friend.name
                        })
                    );
                });
            });
    }

    add() {
        (this.form.get('friends') as FormArray).push(
            this.fb.group({
                title: new FormControl(this.form.get('person').value.title),
                name: new FormControl(this.form.get('person').value.name)
            })
        );
    }

    remove(i) {
        (this.form.get('friends') as FormArray).removeAt(i);
    }

    onSubmit() {
        console.log('Submit:', this.form.value);
    }
}
