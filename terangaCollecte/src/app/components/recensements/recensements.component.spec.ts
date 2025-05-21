import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecensementsComponent } from './recensements.component';

describe('RecensementsComponent', () => {
  let component: RecensementsComponent;
  let fixture: ComponentFixture<RecensementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecensementsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecensementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
