import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RandomAdComponent } from './random-ad.component';

describe('RandomAdComponent', () => {
  let component: RandomAdComponent;
  let fixture: ComponentFixture<RandomAdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RandomAdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RandomAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
