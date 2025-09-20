import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { McqService } from '../../services/mcq.service';
import { LoginService } from '../../services/login.service';
import { Mcq } from '../../models/mcq';

@Component({
  selector: 'app-mcq',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './mcq.component.html',
})
export class McqComponent {

  constructor(private mcqService: McqService, private LoginService: LoginService) { }
  correctAnswer: string = '';
  selectedIndex: number | null = null;
  selectedAnswer: string | null = null;
  isLoading: boolean = false;
  topicName: string = '';
  difficulty: string[] = ['easy', 'medium', 'hard'];
  selectedDifficulty: string = '';
  numberOfQuestions: number | undefined;
  mcqData: Mcq[] = [];

  mcqGenerate(mcqForm: any) {
    if (mcqForm.valid) {
      if (this.LoginService.checkLoginUser()) {
        this.isLoading = true;
        const mcqPayload = { topic: this.topicName, difficulty: this.selectedDifficulty, numberofquestion: this.numberOfQuestions };
        this.mcqService.generateMcq(mcqPayload).subscribe((mcqResponse: any) => {
          this.mcqData = mcqResponse.mcq;
          this.isLoading = false;
          console.log('MCQ Response:', mcqResponse);
        }, (error: any) => {
          this.isLoading = false;
          console.error('Error generating MCQ:', error);
          alert('Failed to generate MCQ. Please try again later.');
        }
        );
      } else {
        alert("Please login to generate MCQ");
      }
    }
  }

  selectAnswer(index: number, answer: string) {
    this.selectedIndex = index;
    this.selectedAnswer = answer;
    this.correctAnswer = this.mcqData[index]?.answer;

    const isCorrect = this.correctAnswer === answer;
    console.log(`${isCorrect ? 'Correct' : 'Incorrect'} answer for question ${index}`);
  }

  downloadMCQ() {
    if (this.mcqData.length > 0) {
      const rows = this.mcqData;
      const header = ['Question', 'Option A', 'Option B', 'Option C', 'Option D', 'Answer'];
      const csvRows = rows.map(r => [
        r.question,
        r.options.A,
        r.options.B,
        r.options.C,
        r.options.D,
        r.answer
      ]);

      const csv = [
        header.join(','),
        ...csvRows.map(row => row.map(val => `"${val}"`).join(','))
      ].join('\n');
      // Download CSV file
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = 'mcq-data.csv';
      link.click();
      URL.revokeObjectURL(link.href);
    }
    
  }

}
