import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-province-lookup-material',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './province-lookup-material.component.html',
  styleUrl: './province-lookup-material.component.css',
})
export class ProvinceLookupMaterialComponent {}
