import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Attack } from 'src/app/models/Attack';
import { Character } from 'src/app/models/Character';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { CharacterService } from 'src/app/services/character.service';
import { Helpers } from 'src/app/utils/helpers';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-character-page',
  templateUrl: './character-page.component.html',
  styleUrls: ['./character-page.component.scss']
})
export class CharacterPageComponent {
  public convertAbilityScoreToAbilityScoreModifier = Helpers.convertAbilityScoreToAbilityScoreModifier;
  public convertAttackAttrStringToValue = Helpers.convertAttackAttrStringToValue;
  public convertModifierToString = Helpers.convertModifierToString;

  generateAttackString = Helpers.generateAttackString;
  generateDamageString = Helpers.generateDamageString;

  public character: Character | undefined;

  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    avatarURL: new FormControl('', Validators.required),
    strScore: new FormControl('', Validators.required),
    dexScore: new FormControl('', Validators.required),
    conScore: new FormControl('', Validators.required)
  });

  constructor(
    public characterService: CharacterService,
    private route: ActivatedRoute,
    private alertService: AlertService
  ) {
    const id = this.route.snapshot.paramMap.get('id');

    if (id == null) {
      this.alertService.error('No character ID given.');
      return;
    }

    this.characterService.getCharacter(id).then(character => {
      this.character = character;

      this.form.get('name')?.setValue(this.character?.name);
      this.form.get('avatarURL')?.setValue(this.character?.avatarURL);
      this.form.get('strScore')?.setValue(this.character?.strengthScore);
      this.form.get('dexScore')?.setValue(this.character?.dexterityScore);
      this.form.get('conScore')?.setValue(this.character?.constitutionScore);
    })
  }

  public onSubmit() {
    if (this.form.invalid) return;
  }
}
