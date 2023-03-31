import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasterEditComponent } from './master-edit.component';

describe('MasterEditComponent', () => {
  let component: MasterEditComponent;
  let fixture: ComponentFixture<MasterEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MasterEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MasterEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
