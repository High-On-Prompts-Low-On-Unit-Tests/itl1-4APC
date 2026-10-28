import { Component, OnInit, signal } from '@angular/core';
import { Api, Project } from '../../services/api';

@Component({
  selector: 'app-projekte-liste',
  templateUrl: './projekte-liste.page.html',
  styleUrls: ['./projekte-liste.page.scss'],
  standalone: false,
})
export class ProjekteListePage implements OnInit {
  projekte = signal<Project[]>([]);

  constructor(private api: Api) {}

  ngOnInit() {
    this.api.getProjects().subscribe(data => this.projekte.set(data));
  }
}
