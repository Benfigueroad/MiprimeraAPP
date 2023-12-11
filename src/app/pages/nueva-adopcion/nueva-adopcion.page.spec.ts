import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NuevaAdopcionPage } from './nueva-adopcion.page';

describe('NuevaAdopcionPage', () => {
  let component: NuevaAdopcionPage;
  let fixture: ComponentFixture<NuevaAdopcionPage>;

  beforeEach(async() => {
    fixture = TestBed.createComponent(NuevaAdopcionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
